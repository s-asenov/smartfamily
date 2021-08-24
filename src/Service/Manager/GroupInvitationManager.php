<?php


namespace App\Service\Manager;


use App\Entity\Group;
use App\Entity\GroupInvitation;
use App\Entity\User;
use App\Service\ApiHelper;
use App\Service\FCMSender;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class GroupInvitationManager
 *
 * This class is responsible for the logic behind the GroupInvitation objects.
 *
 * @see GroupInvitation
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupInvitationManager extends ObjectManager
{
    private $relationManager;
    private $membershipManager;
    private $fcmSender;
    private $notificationManager;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper, UserRelationManager $relationManager, GroupMembershipManager $membershipManager, FCMSender $fcmSender, NotificationManager $notificationManager)
    {
        parent::__construct($entityManager, $helper);
        $this->relationManager = $relationManager;
        $this->membershipManager = $membershipManager;
        $this->fcmSender = $fcmSender;
        $this->notificationManager = $notificationManager;
    }

    /**
     * Method creating the group invitation.
     *
     * This method takes the authenticated user and the request
     * and returns an array of the response.
     *
     * @param User $user
     * @param Request $request
     * @return array
     */
    public function createInvitation(User $user, Request $request)
    {
        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['invited_id', 'group_id'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $invite['invited_id'] = (int) $request->request->get("invited_id");
        $invite['group_id'] = (int) $request->request->get("group_id");

        $invited = $this->entityManager->getRepository(User::class)->find($invite['invited_id']);
        $group = $this->entityManager->getRepository(Group::class)->find($invite['group_id']);
        $existingInvitation = $this->entityManager->getRepository(GroupInvitation::class)
            ->findExistingInvitation($user->getId(), $invite['invited_id'], $invite['group_id']);
        $validData = ($group && $invited);

        /**
         * If there is already an existing invitation,
         * the provided data is invalid,
         * the invited user is the same as the authenticated user,
         * the invited user is already in the group or
         * the authenticated user is not in the group,
         * return an array of the error response.
         *
         * @see ApiHelper::prepareForErrorResponse()
         */
        if ($existingInvitation || !$validData || $invited === $user || $this->membershipManager->userInGroup($invited, $group) || !$this->membershipManager->userInGroup($user, $group)) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $relation = $this->relationManager->checkUserRelations($user, $invited);

        /**
         * If the authenticated and invited users are already in relation
         * and the invited is a child of the authenticated,
         * add the invited directly in the group.
         */
        if ($relation && $relation->getFriendIsChild() == 1) {
            $this->membershipManager->addMembership($invited, $group);

            return $this->helper->prepareForSuccessResponse([
                'status' => self::META_SUCCESS,
                'child' => "added"
            ]);
        }

        /**
         * Otherwise add the group invitation
         * and return the array of the success response.
         *
         * @see ApiHelper::prepareForSuccessResponse()
         */
        $invitation = new GroupInvitation();

        $invitation->setInviter($user)
            ->setInvited($invited)
            ->setGroup($group)
            ->setStatus(0);

        $this->entityManager->persist($invitation);
        
        $this->notificationManager->sendGroupInvitationNotification($invitation); //add a notification in the db
        $this->fcmSender->notifyUserForGroupInvitation($invitation); //if the user has active device with enabled push notifications, send them too.

        $this->entityManager->flush();
        
        $normalizedInvitation = $this->helper->generalNormalizer($invitation);

        return $this->helper->prepareForSuccessResponse($normalizedInvitation);
    }

    /**
     * Method deleting the group invitation.
     *
     * This method takes the group invitation object and the authenticated user
     * and checks if the user is the same as the inviter and the invitation is pending.
     * If it is not return an array of the error response.
     *
     * @param GroupInvitation $invitation
     * @param User $user
     * @return array
     */
    public function deleteGroupInvitation(GroupInvitation $invitation, User $user)
    {
        $inviter = $invitation->getInviter();

        if ($user !== $inviter ||  0 !== $invitation->getStatus()) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $this->entityManager->remove($invitation);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'invitation' => self::META_DELETED
        ]);
    }

    /**
     * Method rejecting the group invitation.
     *
     * This method takes the group invitation object and the authenticated user
     * and checks if the user is the same as the invited and the invitation is pending.
     * If it is not return an array of the error response.
     *
     * @param GroupInvitation $invitation
     * @param User $user
     * @return array
     */
    public function rejectGroupInvitation(GroupInvitation $invitation, User $user)
    {
        $invited = $invitation->getInvited();
        
        if ($user !== $invited || 0 != $invitation->getStatus()) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $invitation->setStatus(2);

        $this->entityManager->persist($invitation);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'invitation' => self::META_REJECTED
        ]);
    }

    /**
     * Method accepting the group invitation.
     *
     * This method takes the group invitation object and the authenticated user
     * and checks if the user is the same as the invited and the invitation is pending.
     * If it is not, return an array of the error response.
     *
     * @param GroupInvitation $invitation
     * @param User $user
     * @return array
     */
    public function acceptGroupInvitation(GroupInvitation $invitation, User $user)
    {
        $group = $invitation->getGroup();
        $invited = $invitation->getInvited();
        
        if ($user !== $invited || 0 != $invitation->getStatus()) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $invitation->setStatus(1);

        $this->entityManager->persist($invitation);
        $this->entityManager->flush();

        $this->membershipManager->addMembership($invited, $group);
        
        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'invitation' => self::META_ACCEPTED
        ]);
    }

    /**
     * Method showing the group invitations sent by the authenticated user.
     *
     * @param User $user
     * @return array of the *normalized* group invitations.
     */
    public function showGroupInvitations(User $user)
    {
        $repository = $this->entityManager->getRepository(GroupInvitation::class);
        $invitations = $repository->findOutgoingGroupInvitations($user->getId());

        $normalizedInvitations = $this->helper->generalNormalizer($invitations);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }

    /**
     * Method showing the pending group invitations for the authenticated user.
     *
     * @param User $user
     * @return array of the *normalized* group invitations.
     */
    public function showPendingGroupInvitations(User $user)
    {
        $repository = $this->entityManager->getRepository(GroupInvitation::class);
        $invitations = $repository->findPendingInvitations($user->getId());

        $normalizedInvitations = $this->helper->generalNormalizer($invitations);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }
}