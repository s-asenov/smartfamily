<?php


namespace App\Controller\Api;

use App\Entity\Group;
use App\Service\Manager\GroupManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/groups", name="api_group_")
 *
 * Class GroupController
 * Manages the API endpoints responsible for the user groups.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupController extends BaseApiController
{
    private $manager;

    public function __construct(GroupManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("", name="create", methods={"POST"})
     */
    public function createGroup(Request $request)
    {
        $create = $this->manager->createGroup($request, $this->getUser());

        return new JsonResponse($create['result'], $create['status_code']);
    }

    /**
     * @Route("/{id}", name="update", methods={"POST"})
     */
    public function updateGroup(Group $group, Request $request)
    {
        $update = $this->manager->updateGroupInfo($request, $group, $this->getUser());

        return new JsonResponse($update['result'], $update['status_code']);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteGroup(Group $group)
    {
        $delete = $this->manager->deleteGroup($group, $this->getUser());

        return new JsonResponse($delete['result'], $delete['status_code']);
    }

    
    /**
     * @Route("/{id}", name="show", methods={"GET"})
     */
    public function showGroup($id)
    {
        $group = $this->getDoctrine()->getRepository(Group::class)->findGroup($id);
        
        $show = $this->manager->showGroup($group);

        return new JsonResponse($show['result'], $show['status_code']);
    }

}