<?php


namespace App\Controller\Api;


use App\Service\Manager\FCMTokenManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/fcm", name="api_fcm_")
 *
 * Class FCMTokenController
 * Manages the API endpoints responsible for the FCM tokens.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class FCMTokenController extends BaseApiController
{
    private $manager;

    public function __construct(FCMTokenManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route("/mark", name="mark", methods={"POST"})
     */
    public function markAsActive(Request $request)
    {
        $mark = $this->manager->markFCMTokenAsActiveByRequest($this->getUser(), $request);

        return new JsonResponse($mark['result'], $mark['status_code']);
    }

    /**
     * @Route("/unmark", name="unmark", methods={"POST"})
     */
    public function markAsUnactive(Request $request)
    {
        $unmark = $this->manager->markFCMTokenAsUnactiveByRequest($this->getUser(), $request);

        return new JsonResponse($unmark['result'], $unmark['status_code']);
    }

    /**
     * @Route("", name="remove", methods={"DELETE"})
     */
    public function remooveToken(Request $request)
    {
        $remove = $this->manager->removeToken($this->getUser(), $request);

        return new JsonResponse($remove['result'], $remove['status_code']);
    }
}