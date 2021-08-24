<?php


namespace App\Controller\Api;

use App\Entity\Group;
use App\Entity\GroupMembership;
use App\Service\Manager\GroupMembershipManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/group-memberships", name="api_group_membership_")
 *
 * Class GroupMembershipController
 * Manages the API endpoints responsible for the group memberships.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupMembershipController extends BaseApiController
{
    private $manager;

    public function __construct(GroupMembershipManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("/leave/{id}", name="leave", methods={"DELETE"})
     */
    public function leaveGroup(Group $group)
    {
        $leave = $this->manager->leaveGroup($this->getUser(), $group);

        return new JsonResponse($leave['result'], $leave['status_code']);
    }

    /**
     * @Route("/kick/{id}", name="kick", methods={"DELETE"})
     */
    public function kickFromGroup(GroupMembership $membership)
    {
        $kick = $this->manager->kickFromGroup($this->getUser(), $membership);

        return new JsonResponse($kick['result'], $kick['status_code']);
    }

    /**
     * @Route("/give-permission/{id}", name="give_permission", methods={"PATCH"})
     */
    public function giveUserPermission(GroupMembership $membership)
    {
        $givePermission = $this->manager->giveUserPermission($membership, $this->getUser());

        return new JsonResponse($givePermission['result'], $givePermission['status_code']);
    }

    /**
     * @Route("/reduce-permission/{id}", name="reduce_permission", methods={"PATCH"})
     */
    public function reduceUserPermission(GroupMembership $membership)
    {
        $reducePermission = $this->manager->reduceUserPermission($membership, $this->getUser());

        return new JsonResponse($reducePermission['result'], $reducePermission['status_code']);
    }

    /**
     * @Route("/groups", name="show_groups", methods={"GET"})
     */
    public function showUserGroups()
    {
        $groups = $this->manager->showUserGroups($this->getUser());

        return new JsonResponse($groups['result'], $groups['status_code']);
    }

    /**
     * @Route("/mobile-groups", name="show_groups_mobile", methods={"GET"})
     */
    public function showUsersInGroups()
    {
        $result = $this->manager->showUsersInGroups($this->getUser());

        return new JsonResponse($result['result'], $result['status_code']);
    }

    /**
     * @Route("/users/{id}", name="show_users", methods={"GET"})
     */
    public function showUsersInGroup(Group $group)
    {
        $users = $this->manager->showUsersInGroup($this->getUser(), $group);

        return new JsonResponse($users['result'], $users['status_code']);
    }

    /**
     * @Route("/{id}", name="show_user_in_group", methods={"GET"})
     */
    public function showUserMembershipInGroups(Group $group)
    {
        $groups = $this->manager->showUserInGroup($this->getUser(), $group);

        return new JsonResponse($groups['result'], $groups['status_code']);
    }
}