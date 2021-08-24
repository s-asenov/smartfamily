<?php


namespace App\Controller\Api;

use App\Entity\GroupInvitation;
use App\Service\Manager\GroupInvitationManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/group-invitations", name="api_group_invitation_")
 *
 * Class GroupInvitationController
 * Manages the API endpoints responsible for the group invitations.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupInvitationController extends BaseApiController
{
    private $manager;

    public function __construct(GroupInvitationManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("", name="send", methods={"POST"})
     */
    public function sendGroupInvitation(Request $request)
    {
        $invitation = $this->manager->createInvitation($this->getUser(), $request);

        return new JsonResponse($invitation['result'], $invitation['status_code']);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteGroupInvitation(GroupInvitation $invitation)
    {
        $delete = $this->manager->deleteGroupInvitation($invitation, $this->getUser());

        return new JsonResponse($delete['result'], $delete['status_code']);
    }

    /**
     * @Route("/reject/{id}", name="reject", methods={"PATCH"})
     */
    public function rejectGroupInvitation(GroupInvitation $invitation)
    {
        $rejected = $this->manager->rejectGroupInvitation($invitation, $this->getUser());

        return new JsonResponse($rejected['result'], $rejected['status_code']);
    }

    /**
     * @Route("/accept/{id}", name="accept", methods={"PATCH"})
     */
    public function acceptGroupInvitation(GroupInvitation $invitation)
    {
        $accepted = $this->manager->acceptGroupInvitation($invitation, $this->getUser());

        return new JsonResponse($accepted['result'], $accepted['status_code']);
    }

    /**
     * @Route("", name="outgoing", methods={"GET"})
     */
    public function showGroupInvitations()
    {
        $pending = $this->manager->showGroupInvitations($this->getUser());

        return new JsonResponse($pending['result'], $pending['status_code']);
    }

    /**
     * @Route("/pending", name="pending", methods={"GET"})
     */
    public function showPendingGroupInvitations()
    {
        $pending = $this->manager->showPendingGroupInvitations($this->getUser());

        return new JsonResponse($pending['result'], $pending['status_code']);
    }
}