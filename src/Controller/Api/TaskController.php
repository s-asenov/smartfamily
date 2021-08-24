<?php


namespace App\Controller\Api;


use App\Entity\Task;
use App\Service\Manager\TaskManager;
use App\Service\Manager\TaskMarkerManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("api/tasks", name="api_task_")
 *
 * Class TaskController
 * Manages the API endpoints responsible for the tasks.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class TaskController extends BaseApiController
{
    private $manager;
    private $markerManager;

    public function __construct(TaskManager $manager, TaskMarkerManager $markerManager)
    {
        $this->manager = $manager;
        $this->markerManager = $markerManager;
    }

    /**
     * @Route("", name="create", methods={"POST"})
     */
    public function createTask(Request $request)
    {
        $create = $this->manager->createTask($request, $this->getUser());

        return new JsonResponse($create['result'], $create['status_code']);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function deleteTask(Task $user)
    {
        $delete = $this->manager->deleteTask($user, $this->getUser());

        return new JsonResponse($delete['result'], $delete['status_code']);
    }

    /**
     * @Route("/done/{id}", name="mark_as_done", methods={"PATCH"})
     */
    public function markAsDone(Task $task)
    {
        $mark = $this->manager->markTaskAsDone($task, $this->getUser());

        return new JsonResponse($mark['result'], $mark['status_code']);
    }

    /**
     * @Route("/unfinished/{id}", name="mark_as_done_unfinished", methods={"PATCH"})
     */
    public function markAsUnfinished(Task $task)
    {
        $mark = $this->manager->markTaskAsUnfinished($task, $this->getUser());

        return new JsonResponse($mark['result'], $mark['status_code']);
    }

    /**
     * @Route("/appointed", name="show_made", methods={"GET"})
     */
    public function showAllAppointedTasks()
    {
        $show = $this->manager->showAppointedTasks($this->getUser());

        return new JsonResponse($show['result'], $show['status_code']);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"}, requirements={"id"="\d+"})
     */
    public function showTask(Task $task)
    {
        $show = $this->manager->showTask($task);

        return new JsonResponse($show['result'], $show['status_code']);
    }

    /**
     * @Route("", name="show_all", methods={"GET"})
     */
    public function showAllOngoingTasks()
    {
        $show = $this->manager->showOngoingTasks($this->getUser());

        return new JsonResponse($show['result'], $show['status_code']);
    }

    /**
     * @Route("/warn", name="warn_expiring", methods={"GET"})
     */
    public function warnForExpringTasks()
    {
        $warn = $this->manager->warnUserForExpiringTasks($this->getUser());

        return new JsonResponse($warn['result'], $warn['status_code']);
    }

    /**
     * @Route("/statistics", name="get_stats", methods={"GET"})
     */
    public function showTasksStatistics()
    {
        $show = $this->manager->getTasksStatistics($this->getUser());

        return new JsonResponse($show['result'], $show['status_code']);
    }

    /**
     * @Route("/markers/{id}", name="add_markers", methods={"POST"})
     */
    public function addMarkers(Task $task, Request $request) 
    {
        $add = $this->markerManager->addMarkers($request, $task);

        return new JsonResponse($add['result'], $add['status_code']);
    }

    /**
     * @Route("/markers/{id}", name="get_markers", methods={"GET"})
     */
    public function getMarkers(Task $task) 
    {
        $get = $this->markerManager->getMarkers($task, $this->getUser());

        return new JsonResponse($get['result'], $get['status_code']);
    }
}