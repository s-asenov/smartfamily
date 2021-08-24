<?php


namespace App\Service\Manager;


use App\Entity\User;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Service\ImageUploader;

/**
 * Class UserManager
 *
 * This class is responsible for the logic behind the User objects.
 *
 * @see User
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserManager extends ObjectManager
{
    private $encoder;
    private $uploader;
    private $session;
    private $tokenManager;
    private $notificationManager;

    public function __construct(UserPasswordEncoderInterface $encoder, EntityManagerInterface $entityManager, ApiHelper $helper, ImageUploader $uploader, SessionInterface $session, FCMTokenManager $tokenManager, NotificationManager $notificationManager)
    {
        parent::__construct($entityManager, $helper);
        $this->encoder = $encoder;
        $this->uploader = $uploader;
        $this->session = $session;
        $this->tokenManager = $tokenManager;
        $this->notificationManager = $notificationManager;
    }

    /**
     * Method responsible for the registration of a user.
     *
     * This method takes the authenticated user and the request
     * and handles the logic.
     *
     * @param Request $request
     * @return array|JsonResponse|null
     * @throws \Exception
     */
    public function createUser(Request $request)
    {
        // If the request has provided auth token, return an array of the error response.
        // if ($request->headers->has("Authorization") || $this->session->has('token')) {
        //     return [
        //         'result' => [ 
        //             'error' => "User already logged"
        //         ],
        //         'status_code' => 403
        //     ];
        // }

        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['username', 'first_name', 'last_name', 'email', 'password', 'password_confirmation'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $data['username'] = $request->request->get("username");
        $data['first_name'] = $request->request->get("first_name");
        $data['last_name'] = $request->request->get("last_name");
        $data['email'] = $request->request->get("email");
        $data['password'] = $request->request->get("password");
        $data['password_confirmation'] = $request->request->get("password_confirmation");
        $data['user_img'] = $request->files->get("user_img");

        /**
         * If there is no image passed in the request, set the image path to empty string.
         * If there is, upload the image in the uploads directrory and set the image path to the
         * corresponding one created from the uploader service.
         *
         * @see ImageUploader::upload()
         */
        if (!$data['user_img']) {
            $userImgFile = "";
        } else {
            $userImgFile = $this->uploader->upload($data['user_img']);
        }

        // If the password and confirm password are not the same, return an array of the error response.
        if ($data['password'] != $data['password_confirmation']) {
            return $this->helper->prepareForErrorResponse("Паролите не съвпадат!");
        }

        // Create the new User object with the passed data from the request.
        $user = new User();

        $user->setNewPassword($data['password'])
            ->setUserImg($userImgFile)
            ->setUsername($data['username'])
            ->setFirstName($data['first_name'])
            ->setLastName($data['last_name'])
            ->setEmail($data['email'])
            ->setLastSeen(new \DateTime())
            ->setDateCreated(new \DateTime())
            ->setIsActive(1)
            ->setToken($this->helper->generateRandomStrings());

        /**
         * Validate the newly created User object with validator service
         * and if there are errors return them.
         */
        $errors = $this->helper->validate($user);

        if ($errors) {
            return $errors;
        }

        // Encode the raw password, set the password to the encoded one and erase the raw one.
        $encodedPassword = $this->encoder->encodePassword($user, $user->getNewPassword());
        $user->setPassword($encodedPassword);
        $user->eraseCredentials();

        $this->entityManager->persist($user);
        $this->notificationManager->sendWelcomeNotification($user);

        $this->entityManager->flush();

        if ($request->request->has("fcm_token")) {
            $fcmToken = $request->request->get("fcm_token");

            $this->tokenManager->markFCMTokenAsActive($user, $fcmToken);
        }

        // Start a session and store the token in it.
        $this->session->start();
        $this->session->set('token', $user->getToken());

        $normalized = $this->helper->currentUserNormalizer($user);

        return $this->helper->prepareForSuccessResponse($normalized);
    }

    /**
     * Method responsible for the login.
     *
     * This method takes the authenticated user,
     * sets the user as active and update the last seen date and
     * starts a session and store the auth token in it.
     *
     * @param User $user
     * @param Request $request
     * @return array
     * @throws \Exception
     */
    public function login(User $user, Request $request)
    {
        $user->setIsActive(1)
            ->setLastSeen(new \DateTime());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        if ($request->request->has("fcm_token")) {
            $fcmToken = $request->request->get("fcm_token");

            $this->tokenManager->markFCMTokenAsActive($user, $fcmToken);
        }

        $this->session->start();
        $this->session->set('token', $user->getToken());

        $normalizedUser = $this->helper->currentUserNormalizer($user);

        return $this->helper->prepareForSuccessResponse($normalizedUser);
    }

    /**
     * Method updating the users password.
     *
     * This method takes the request and the authenticated user
     * and handles the logic.
     *
     * @param User $user
     * @param Request $request
     * @return array|null
     */
    public function updatePassword(User $user, Request $request)
    {
        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['old_password', 'password', 'password_confirmation'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $data['old_password'] = $request->request->get("old_password");
        $data['password'] = $request->request->get("password");
        $data['password_confirmation'] = $request->request->get("password_confirmation");

        // If the new password and confirm password are not the same, return an array of the error response.
        if ($data['password'] != $data['password_confirmation']) {
            return $this->helper->prepareForErrorResponse("Паролите не съвпадат!");
        }

        // If the new password and old password are the same, return an array of the error response.
        if ($data['password'] == $data['old_password']) {
            return $this->helper->prepareForErrorResponse("Новата и старата парола не могат да са идентични!");
        }

        // If the old password is invalid, return an array of the error response.
        if (!$this->encoder->isPasswordValid($user, $data['old_password'])) {
            return $this->helper->prepareForErrorResponse("Невалидни данни!");
        }

        /**
         * Validate the newly set password with validator service
         * and if there are errors return them.
         */
        $user->setNewPassword($data['password']);
        $errors = $this->helper->validate($user);

        if ($errors) {
            return $errors;
        }

        // Encode the raw password, set the password to the encoded one and erase the raw one.
        $encodedPassword = $this->encoder->encodePassword($user, $user->getNewPassword());
        $user->setPassword($encodedPassword);
        $user->eraseCredentials();

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $normalized = $this->helper->generalNormalizer($user);

        return $this->helper->prepareForSuccessResponse($normalized);
    }

    public function changeUserImage(User $user, Request $request)
    {
        $userImg = $request->files->get("user_img");

        /**
         * If there is no image passed in the request, set the image path to empty string.
         * If there is, upload the image in the uploads directrory and set the image path to the
         * corresponding one created from the uploader service.
         *
         * @see ImageUploader::upload()
         */
        if (!$userImg) {
            $userImgFile = "";
        } else {
            $userImgFile = $this->uploader->upload($userImg);
        }

        $user->setUserImg($userImgFile);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            "status" => "success",
            "userImg" => $user->getUserImg()
        ]);
    }

    /**
     * This method shows the information about the requested user.
     *
     * @param User $user
     * @return array
     */
    public function showUser(User $user)
    {
        $normalizedUser = $this->helper->generalNormalizer($user);

        return $this->helper->prepareForSuccessResponse($normalizedUser);
    }

    /**
     * Method responsible for the searching of an user by their name(s).
     *
     * This method takes the request checks if the request
     * has provided the required form data and
     * returns an array of the *normalized* user object.
     *
     * @param Request $request
     * @return array
     */
    public function findUsers(Request $request)
    {
        $input = $request->request->get("input");

        if (!$this->helper->validateRequest(['input'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $repository = $this->entityManager->getRepository(User::class);
        $users = $repository->findByInput($input);

        $normalizedUsers = $this->helper->generalNormalizer($users);

        return $this->helper->prepareForSuccessResponse($normalizedUsers);
    }

    /**
     * Method responsible for the logout.
     *
     * This method takes the authenticated user,
     * sets the user as inactive and update the last seen date and
     * invalidates the session.
     *
     * @param User $user
     * @param Request $request
     * @return array
     * @throws \Exception
     */
    public function logout(User $user, Request $request)
    {
        $user->setIsActive(0)
            ->setLastSeen(new \DateTime());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        if ($request->request->has("fcm_token")) {
            $fcmToken = $request->request->get("fcm_token");

            $this->tokenManager->markFCMTokenAsUnactive($user, $fcmToken);
        }

        $this->session->invalidate();

        return $this->helper->prepareForSuccessResponse("Успешно излезли!");
    }
}