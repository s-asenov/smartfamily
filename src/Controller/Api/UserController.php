<?php


namespace App\Controller\Api;


use App\Entity\User;
use App\Service\Manager\UserManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UserController
 * Manages the API endpoints responsible for the users.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserController extends BaseApiController
{
    private $service;

    public function __construct(UserManager $service)
    {
        $this->service = $service;
    }

    /**
     * @Route("/user/register", name="api_user_register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $register = $this->service->createUser($request);
    
        return new JsonResponse($register['result'], $register['status_code']);
    }

    /**
     * @Route("/api/login", name="api_user_login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $login = $this->service->login($this->getUser(), $request);

        return new JsonResponse($login['result'], $login['status_code']);
    }

    /**
     * @Route("api/user/update-pass", name="api_user_update_password", methods={"POST"})
     */
    public function updatePassword(Request $request)
    {
        $update = $this->service->updatePassword($this->getUser(), $request);

        return new JsonResponse($update['result'], $update['status_code']);
    }

    /**
     * @Route("api/user", name="api_current_user", methods={"GET"})
     */
    public function showCurrentUser()
    {
        $user = $this->service->showUser($this->getUser());

        return new JsonResponse($user['result'], $user['status_code']);
    }

    /**
     * @Route("api/user/{username}", name="api_user_info", methods={"GET"})
     */
    public function showUser(User $user)
    {
        $user = $this->service->showUser($user);

        return new JsonResponse($user['result'], $user['status_code']);
    }

    /**
     * @Route("api/user/find", name="api_user_info", methods={"POST"})
     */
    public function findUsers(Request $request)
    {
        $users = $this->service->findUsers($request);

        return new JsonResponse($users['result'], $users['status_code']);
    }

    /**
     * @Route("api/logout", name="api_user_logout", methods={"GET", "POST"})
     */
    public function logout(Request $request)
    {
        $logout = $this->service->logout($this->getUser(), $request);

        return new JsonResponse($logout['result'], $logout['status_code']);
    }

    /**
     * @Route("api/user/change-image", name="api_user_change_image", methods={"POST"})
     */
    public function changeImage(Request $request)
    {
        $change = $this->service->changeUserImage($this->getUser(), $request);

        return new JsonResponse($change['result'], $change['status_code']);
    }

}