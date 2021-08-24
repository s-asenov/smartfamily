<?php


namespace App\Controller\Api;


use App\Entity\UserInvitation;
use App\Service\Manager\UserInvitationManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/user-invitations", name="api_user_invitation_")
 *
 * Class UserInvitationController
 * Manages the API endpoints responsible for the user invitations.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserInvitationController extends BaseApiController
{
    private $manager;

    public function __construct(UserInvitationManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("", name="send", methods={"POST"})
     */
    public function sendUserInvitation(Request $request)
    {
        $invitation = $this->manager->createInvitation($this->getUser(), $request);

        return new JsonResponse($invitation['result'], $invitation['status_code']);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteUserInvitation(UserInvitation $invitation)
    {
        $invitation = $this->manager->deleteInvitation($invitation, $this->getUser());

        return new JsonResponse($invitation['result'], $invitation['status_code']);
    }

    /**
     * @Route("/reject/{id}", name="reject", methods={"PATCH"})
     */
    public function rejectUserInvitation(UserInvitation $invitation)
    {
        $rejected = $this->manager->rejectInvitation($invitation, $this->getUser());

        return new JsonResponse($rejected['result'], $rejected['status_code']);
    }

    /**
     * @Route("/accept/{id}", name="accept", methods={"PATCH"})
     */
    public function acceptUserInvitation(UserInvitation $invitation)
    {
        $accepted = $this->manager->acceptInvitation($invitation, $this->getUser());

        return new JsonResponse($accepted['result'], $accepted['status_code']);
    }

    /**
     * @Route("/pending", name="pending", methods={"GET"})
     */
    public function showPendingUserInvitations()
    {
        $pending = $this->manager->showPendingUserInvitations($this->getUser());

        return new JsonResponse($pending['result'], $pending['status_code']);
    }

    /**
     * @Route("", name="outgoing", methods={"GET"})
     */
    public function showUserInvitations()
    {
        $invitations = $this->manager->showUserInvitations($this->getUser());

        return new JsonResponse($invitations['result'], $invitations['status_code']);
    }

}