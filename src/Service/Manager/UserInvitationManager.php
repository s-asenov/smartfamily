<?php


namespace App\Service\Manager;


use App\Entity\User;
use App\Entity\UserInvitation;
use App\Service\ApiHelper;
use App\Service\FCMSender;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class UserInvitationManager
 *
 * This class is responsible for the logic behind the UserInvitation objects.
 *
 * @see UserInvitation
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserInvitationManager extends ObjectManager
{
    private $userRelationManager;
    private $fcmSender;
    private $notificationManager;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper, UserRelationManager $userRelationManager, FCMSender $fcmSender, NotificationManager $notificationManager)
    {
        parent::__construct($entityManager, $helper);
        $this->userRelationManager = $userRelationManager;
        $this->fcmSender = $fcmSender;
        $this->notificationManager = $notificationManager;
    }

    /**
     * * Method creating the group invitation.
     *
     * This method takes the authenticated user and the request
     * and returns an array of the response.
     *
     * @param User $inviter
     * @param Request $request
     * @return array
     */
    public function createInvitation(User $inviter, Request $request)
    {
        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['invited_id', 'is_child'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $invite['invited_id'] = (int) $request->request->get("invited_id");
        $invite['is_child'] = (int) $request->request->get("is_child");

        $invited = $this->entityManager->getRepository(User::class)->find($invite['invited_id']);

        $existingInvitation = $this->entityManager->getRepository(UserInvitation::class)
            ->findExistingInvitation($inviter, $invited);
        $existingRelation = $this->userRelationManager->checkUserRelations($inviter, $invited);

        /**
         * If there is already an existing invitation,
         * the provided data is invalid,
         * the invited user is the same as the authenticated user or
         * the users already have existing relation
         * return an array of the error response.
         *
         * @see ApiHelper::prepareForErrorResponse()
         */
        if ($existingInvitation || !$invited || $inviter === $invited || $existingRelation) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        /**
         * Otherwise add the user invitation
         * and return the array of the success response.
         *
         * @see ApiHelper::prepareForSuccessResponse()
         */
        $invitation = new UserInvitation();

        $invitation->setInviter($inviter)
            ->setInvited($invited)
            ->setInvitedIsChild($invite['is_child'])
            ->setStatus(0);
        
        $this->entityManager->persist($invitation);
        $this->notificationManager->sendUserInvitationNotification($invitation);

        $this->entityManager->flush();

        $this->fcmSender->notifyUserForUserInvitation($invitation);

        $response = $this->helper->generalNormalizer($invitation);

        return $this->helper->prepareForSuccessResponse($response);
    }

    /**
     * Method deleting the user invitation.
     *
     * This method takes the user invitation object and the authenticated user
     * and checks if the user is the same as the inviter and the invitation is pending.
     * If it is not return an array of the error response.
     *
     * @param UserInvitation $invitation
     * @param User $user
     * @return array
     */
    public function deleteInvitation(UserInvitation $invitation, User $user)
    {
        $inviter = $invitation->getInviter();

        if ($user === $inviter &&  0 == $invitation->getStatus()) {
            $this->entityManager->remove($invitation);
            $this->entityManager->flush();

            return $this->helper->prepareForSuccessResponse([
                'status' => self::META_SUCCESS,
                'invitation' => self::META_DELETED
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method accepting the user invitation.
     *
     * This method takes the user invitation object and the authenticated user
     * and checks if the user is the same as the invited and the invitation is pending.
     * If it is not, return an array of the error response.
     *
     * @param UserInvitation $invitation
     * @param User $user
     * @return array
     */
    public function acceptInvitation(UserInvitation $invitation, User $user)
    {
        $inviter = $invitation->getInviter();
        $invited = $invitation->getInvited();
        $invitedIsChiled = $invitation->getInvitedIsChild();

        if ($user === $invited && 0 == $invitation->getStatus()) {
            $invitation->setStatus(1);

            $this->entityManager->persist($invitation);
            $this->entityManager->flush();

            $this->userRelationManager->addRelations($inviter, $invited, $invitedIsChiled);
            
            return $this->helper->prepareForSuccessResponse([
                'status' => self::META_SUCCESS,
                'invitation' => self::META_ACCEPTED
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method rejecting the user invitation.
     *
     * This method takes the user invitation object and the authenticated user
     * and checks if the user is the same as the invited and the invitation is pending.
     * If it is not return an array of the error response.
     *
     * @param UserInvitation $invitation
     * @param User $user
     * @return array
     */
    public function rejectInvitation(UserInvitation $invitation, User $user)
    {
        $invited = $invitation->getInvited();

        if ($user === $invited && 0 == $invitation->getStatus()) {
            $invitation->setStatus(2);

            $this->entityManager->persist($invitation);
            $this->entityManager->flush();

            return $this->helper->prepareForSuccessResponse([
                'status' => self::META_SUCCESS,
                'invitation' => self::META_REJECTED
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method showing the pending user invitations for the authenticated user.
     *
     * @param User $user
     * @return array of the *normalized* user invitations
     */
    public function showPendingUserInvitations(User $user)
    {
        $repository = $this->entityManager->getRepository(UserInvitation::class);
        $invitations = $repository->findPendingInvitations($user->getId());

        $normalizedInvitations = $this->helper->generalNormalizer($invitations);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }

    /**
     * Method showing the user invitations sent by the authenticated user.
     *
     * @param User $user
     * @return array of the *normalized* user invitations
     */
    public function showUserInvitations(User $user)
    {
        $repository = $this->entityManager->getRepository(UserInvitation::class);
        $invitations = $repository->findUserInvitations($user->getId());

        $normalizedInvitations = $this->helper->generalNormalizer($invitations);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }
}
