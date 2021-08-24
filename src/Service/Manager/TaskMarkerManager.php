<?php

namespace App\Service\Manager;

use App\Entity\Task;
use App\Entity\TaskMarker;
use App\Entity\User;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class TaskMarkerManager extends ObjectManager {

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper)
    {
        parent::__construct($entityManager, $helper);
    }

    public function addMarkers(Request $request, Task $task)
    {
        $markers = json_decode($request->getContent(), true);

        if (!is_array($markers)) {
            return $this->helper->prepareForErrorResponse(self::UNEXPECTED_ERROR);
        }

        // $pushedMarkers = [];

        foreach ($markers as $marker) {
            $taskMarker = new TaskMarker();

            $taskMarker->setTask($task)
                    ->setLat($marker["lat"])
                    ->setLng($marker["lng"]);
            
            $this->entityManager->persist($taskMarker);
            // array_push($pushedMarkers, $taskMarker);
        }

        $this->entityManager->flush();
        
        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS,
            "markers" => "added"
        ]);
    }

    public function getMarkers(Task $task , User $user)
    {
        if ($task->getAppointee() !== $user && $task->getAppointer() !== $user) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $repository = $this->entityManager->getRepository(TaskMarker::class);
        $markers = $repository->findTaskMarkers($task->getId());   

        $normalizedMarkers = $this->helper->generalNormalizer($markers);
        
        return $this->helper->prepareForSuccessResponse($normalizedMarkers);    
    }
}