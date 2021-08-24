<?php


namespace App\Controller\Api;

use App\Entity\Notification;
use App\Service\EmailSender;
use App\Service\ImageUploader;
use App\Service\Manager\NotificationManager;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class MyController
 * Manages routes which are not connected to any of the DB tables.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class MyController extends BaseApiController
{
    private $notificationManager;

    public function __construct(NotificationManager $notificationManager)
    {
        $this->notificationManager = $notificationManager;
    }

    /**
     * @Route("/uploads/{image}", name="get_upload", methods={"GET"})
     */
    public function showProfileImage($image, ImageUploader $uploader)
    {
        $imageFile = $uploader->showImage($image);
        $path = $imageFile->getPathname();

        return new BinaryFileResponse($path);
    }

    /**
     * @Route("/send-email", name="send_email", methods={"POST"})
     */
    public function sendEmail(Request $request, EmailSender $sender)
    {
        $email = $sender->sendEmailMessage($request);

        return new JsonResponse($email['result'], $email['status_code']);
    }

    /**
     * @Route("/api/notifications/read/{id}", name="read_notifiaction", methods={"GET", "POST"})
     */
    public function readNotification(Notification $notification)
    {
        $read = $this->notificationManager->readNotification($notification, $this->getUser());

        return new JsonResponse($read['result'], $read['status_code']);
    }

    /**
     * @Route("/api/notifications", name="get_all_notifiactions", methods={"GET"})
     */
    public function getUserNotifications()
    {
        $read = $this->notificationManager->getUserNotifications($this->getUser());

        return new JsonResponse($read['result'], $read['status_code']);
    }
}