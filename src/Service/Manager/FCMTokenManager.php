<?php


namespace App\Service\Manager;


use App\Entity\FCMToken;
use App\Entity\User;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class FCMTokenManager extends ObjectManager
{
    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper)
    {
        parent::__construct($entityManager, $helper);
    }

    public function addFCMToken(User $user, string $fcmToken, $isActive)
    {
        $fcm = new FCMToken();

        $fcm->setIsActive($isActive)
            ->setUser($user)
            ->setFcmToken($fcmToken);

        $this->entityManager->persist($fcm);
        $this->entityManager->flush();

        return null;
    }

    public function markFCMTokenAsActiveByRequest(User $user, Request $request)
    {
        if (!$this->helper->validateRequest(["fcm_token"], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $fcmToken = $request->request->get("fcm_token");

        if (!$fcmToken) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $mark = $this->markFCMTokenAsActive($user, $fcmToken);

        if ($mark) {
            return $mark;
        }

        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS
        ]);
    }

    public function markFCMTokenAsActive(User $user, string $fcmToken)
    {
        $repository = $this->entityManager->getRepository(FCMToken::class);
        $fcms = $repository->findUsersWithDevice($fcmToken);

        foreach ($fcms as $fcm) {
            $fcm->setIsActive(0);
            $this->entityManager->persist($fcm);
        }

        $this->entityManager->flush();

        $fcm = $repository->findUserDevice($user, $fcmToken);

        if (!$fcm) {
            $this->addFCMToken($user, $fcmToken, 1);
        } else {
            if ($user !== $fcm->getUser()) {
                return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
            }
            
            $fcm->setIsActive(1);
            $this->entityManager->persist($fcm);
            $this->entityManager->flush();
        }

        return null;
    }

    public function markFCMTokenAsUnactiveByRequest(User $user, Request $request) {
        if (!$this->helper->validateRequest(["fcm_token"], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $fcmToken = $request->request->get("fcm_token");

        if (!$fcmToken) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $mark = $this->markFCMTokenAsUnactive($user, $fcmToken);

        if ($mark) {
            return $mark;
        }

        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS
        ]);
    }

    public function markFCMTokenAsUnactive(User $user, string $fcmToken)
    {
        $repository = $this->entityManager->getRepository(FCMToken::class);
        $fcm = $repository->findUserDevice($user, $fcmToken);

        if (!$fcm) {
            $this->addFCMToken($user, $fcmToken, 0);
        } else {
            if ($user !== $fcm->getUser()) {
                return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
            }
            $fcm->setIsActive(0);
            $this->entityManager->persist($fcm);
            $this->entityManager->flush();
        }

        return null;
    }

    public function getUserActiveTokens(User $user)
    {
        $repository = $this->entityManager->getRepository(FCMToken::class);
        $fcms = $repository->findActiveUserDevices($user);

        $tokens = [];

        foreach ($fcms as $fcm) {
            $fcmToken = $fcm->getFCMToken();
            array_push($tokens, $fcmToken);
        }

        return $tokens;
    }

    public function removeToken(User $user, Request $request)
    {
        if (!$this->helper->validateRequest(["fcm_token"], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $fcmToken = $request->request->get("fcm_token");

        if (!$fcmToken) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $repository = $this->entityManager->getRepository(FCMToken::class);
        $fcm = $repository->findUserDevice($user, $fcmToken);

        if (!$fcm) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $this->entityManager->remove($fcm);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS
        ]);
    }
}