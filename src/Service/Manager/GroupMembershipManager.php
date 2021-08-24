<?php


namespace App\Service\Manager;


use App\Entity\Group;
use App\Entity\GroupMembership;
use App\Entity\Task;
use App\Entity\User;
use App\Service\ApiHelper;
use App\Service\FCMSender;
use Doctrine\ORM\EntityManagerInterface;


/**
 * Class GroupMembershipManager
 *
 * This class is responsible for the logic behind the GroupMembership objects.
 *
 * @see GroupMembership
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupMembershipManager extends ObjectManager
{
    private $fcmSender;
    private $notificationManager;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper, FCMSender $fcmSender, NotificationManager $notificationManager)
    {
        parent::__construct($entityManager, $helper);
        $this->fcmSender = $fcmSender;
        $this->notificationManager = $notificationManager;
    }

    /**
     * Method adding a membership to the corresponding.
     *
     * This method takes the authenticated user, the group object
     * and adds the user to the group.
     *
     * @param User $user
     * @param Group $group
     * @param int $authLevel
     */
    public function addMembership(User $user, Group $group, $authLevel = 0)
    {
        $membership = new GroupMembership();

        $membership->setUser($user)
            ->setGroup($group)
            ->setAuthLevel($authLevel);

        $this->entityManager->persist($membership);
        $this->entityManager->flush();
        
        $this->fcmSender->notifyUserForNewGroup($membership);

        
        $this->notificationManager->sendNewGroupNotification($membership);
    }

    /**
     * Method responsible for the user's leaving of a group.
     *
     * This method takes the authenticated user and the group object
     * and checks if the user is in the group | the membership.
     * If he is not, return the array of the error response.
     *
     * @param User $user
     * @param Group $group
     * @return array
     */
    public function leaveGroup(User $user, Group $group)
    {
        $membership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($user->getId(), $group->getId());

        if (!$membership) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $this->entityManager->getRepository(Task::class)->deleteAllUserTasks($group->getId(), $user->getId());
        $this->entityManager->remove($membership);
        
        $users = $this->entityManager->getRepository(GroupMembership::class)->findUsersInGroup($group->getId());
        
        if (count($users) === 1) {
            $this->entityManager->remove($group);
            $this->entityManager->flush();
        }

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'membership' => self::META_DELETED
        ]);
    }

    /**
     * Method responsible for kicking out of a group.
     *
     * This method takes the authenticated user and the membership object
     * and checks if the user has permission to delete the membership | kick the user out
     * If he does not have, return the array of the error response.
     *
     * @param User $user
     * @param GroupMembership $membership
     * @return array
     */
    public function kickFromGroup(User $user, GroupMembership $membership)
    {
        $permitted = $this->userHasPermission($user, $membership->getGroup());

        if (!$permitted) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $this->entityManager->getRepository(Task::class)->deleteAllUserTasks($membership->getGroup()->getId(), $membership->getUser()->getId());
        $this->entityManager->remove($membership);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'membership' => self::META_DELETED
        ]);
    }

    /**
     * Method responsible for the giving of *admin* permissions in a group.
     *
     * This method takes the authenticated user and the membership object
     * and checks if the user has permission to give *admin* permissions.
     * If he does not have, return the array of the error response.
     *
     * @param GroupMembership $membership
     * @param User $user
     * @return array
     */
    public function giveUserPermission(GroupMembership $membership, User $user)
    {
        $permitted = $this->userHasPermission($user, $membership->getGroup());

        if (!$permitted) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $membership->setAuthLevel(1);

        $this->entityManager->persist($membership);
        $this->entityManager->flush();

        $normalizedMembership  = $this->helper->generalNormalizer($membership);

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'auth' => "given",
            "membership" => $normalizedMembership
        ]);
    }

    /**
     * Method responsible for the reduction of *admin* permissions in a group.
     *
     * This method takes the authenticated user and the membership object
     * and checks if the user has permission to reduce *admin* permissions.
     * If he does not have, return the array of the error response.
     *
     * @param GroupMembership $membership
     * @param User $user
     * @return array
     */
    public function reduceUserPermission(GroupMembership $membership, User $user)
    {
        $permitted = $this->userHasPermission($user, $membership->getGroup());

        if (!$permitted || $user === $membership->getUser()) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $membership->setAuthLevel(0);

        $this->entityManager->persist($membership);
        $this->entityManager->flush();

        $normalizedMembership  = $this->helper->generalNormalizer($membership);

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'auth' => "reduced",
            "membership" => $normalizedMembership
        ]);
    }

    /**
     * Method checking if the user has permission in group.
     *
     * This method takes the authenticated user and the group object
     * and returns true or false whether or not he has permission.
     *
     * @param User $user
     * @param Group $group
     * @return bool
     */
    public function userHasPermission(User $user, Group $group)
    {
        $userMembership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($user->getId(), $group->getId());

        if (0 == $userMembership->getAuthLevel()) {
            return false;
        }

        return true;
    }

    /**
     * Method showing the groups, in which the authenticated user is member of.
     *
     * @param User $user
     * @return array of the *normalized* group memberships.
     */
    public function showUserGroups(User $user)
    {
        $groups = $this->entityManager->getRepository(GroupMembership::class)->findUserGroups($user->getId());
        $normalizedGroups = $this->helper->generalNormalizer($groups);

        return $this->helper->prepareForSuccessResponse($normalizedGroups);
    }

    /**
     * Method showing the groups and the memberships, in which the authenticated user is member of.
     *
     * @param User $user
     * @return array of the *normalized* objects.
     */
    public function showUsersInGroups(User $user)
    {
        $result = [];
        $memberships = $this->entityManager->getRepository(GroupMembership::class)->findUserGroups($user->getId());

        foreach ($memberships as $membership) {
            $group = $membership->getGroup();
            $users = $this->entityManager->getRepository(GroupMembership::class)->findUsersInGroup($group->getId());

            $normalizedMemberships = $this->helper->generalNormalizer($users);
            $normalizedGroup = $this->helper->generalNormalizer($group);
            
            array_push($result, [
                'group' => $normalizedGroup,
                'memberships' => $normalizedMemberships
            ]);
        }
        
        return $this->helper->prepareForSuccessResponse($result);
    }

    /**
     * Method showing the users members of a group.
     *
     * This method takes the authenticated user and the group object
     * and checks if the user is in the group.
     * If he is not, return an array of the error response,
     * otherwise return an array of the *normalized* group memberships.
     *
     * @param User $user
     * @param Group $group
     * @return array
     */
    public function showUsersInGroup(User $user, Group $group)
    {
        if (!$this->userInGroup($user, $group)) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $users = $this->entityManager->getRepository(GroupMembership::class)->findUsersInGroup($group->getId());
        $normalizedUsers = $this->helper->generalNormalizer($users);

        return $this->helper->prepareForSuccessResponse($normalizedUsers);
    }

    /**
     * Method checking if the user is member of the group.
     *
     * This method takes the authenticated user and the group object
     * and returns true or false whether or not he is in the group.
     *
     * @param User $user
     * @param Group $group
     * @return bool
     */
    public function userInGroup(User $user, Group $group)
    {
        $membership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($user->getId(), $group->getId());

        if ($membership) {
            return true;
        }

        return false;
    }

    /**
     * Method showing the user membership in a group.
     *
     * This method takes the authenticated user and the group object
     * and checks if the user is in the group.
     * If he is not, return an array of the error response,
     * otherwise return an array of the *normalized* group membership.
     *
     * @param User $user
     * @param Group $group
     * @return array
     */
    public function showUserInGroup(User $user, Group $group)
    {
        $membership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($user->getId(), $group->getId());
        
        if (!$membership) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }
        
        $normalizedMembership = $this->helper->generalNormalizer($membership);

        return $this->helper->prepareForSuccessResponse($normalizedMembership);
    }
}