<?php


namespace App\Controller\Api;

use App\Entity\UserRelation;
use App\Service\Manager\UserRelationManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/user-relations", name="api_user_relation_")
 *
 * Class UserRelationController
 * Manages the API endpoints responsible for the user relations.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserRelationController extends BaseApiController
{
    private $manager;

    public function __construct(UserRelationManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteFriend(UserRelation $relation)
    {
        $delete = $this->manager->deleteRelation($this->getUser(), $relation);

        return new JsonResponse($delete['result'], $delete['status_code']);
    }

    /**
     * @Route("", name="show", methods={"GET"})
     */
    public function showFriends()
    {
        $friends = $this->manager->showUserRelations($this->getUser());

        return new JsonResponse($friends['result'], $friends['status_code']);
    }

}
