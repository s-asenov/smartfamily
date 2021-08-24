<?php


namespace App\Service\Manager;


use App\Entity\Group;
use App\Entity\GroupMembership;
use App\Entity\Task;
use App\Entity\User;
use App\Service\ApiHelper;
use App\Service\FCMSender;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class TaskManager
 *
 * This class is responsible for the logic behind the Task objects.
 *
 * @see Task
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class TaskManager extends ObjectManager
{
    private $fcmSender;
    private $notificationManager;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper, FCMSender $fcmSender, NotificationManager $notificationManager)
    {
        parent::__construct($entityManager, $helper);
        $this->fcmSender = $fcmSender;
        $this->notificationManager = $notificationManager;
    }

    /**
     * Method creating the task.
     *
     * This method takes the authenticated user and the request
     * and handles the logic.
     *
     * @param User $user
     * @param Request $request
     * @return array
     */
    public function createTask(Request $request, User $user)
    {
        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['task_name', 'task_description', "appointee_id", "expiring_on", "group_id"], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $data['appointee_id'] = (int) $request->request->get("appointee_id");
        $data['group_id'] = (int) $request->request->get("group_id");
        $data['task_name'] = $request->request->get("task_name");
        $data['task_description'] = $request->request->get("task_description");
        $data["expiring_on"] = $request->request->get("expiring_on");

        $appointee = $this->entityManager->getRepository(User::class)->find($data['appointee_id']);
        $group = $this->entityManager->getRepository(Group::class)->find($data['group_id']);

        // If the provided ids are invalid, return an array of the error response
        if (!$appointee || !$group) {
            return $this->helper->prepareForErrorResponse(self::UNEXPECTED_ERROR);
        }

        $userMembership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($user->getId(), $group->getId());
        $appointeeMembership = $this->entityManager->getRepository(GroupMembership::class)->findUserInGroup($appointee, $group->getId());

        /**
         * IF the authenticated user is not a member of the group,
         * the appointee is not a member of the group
         * or the authenticated user has no *admin* permission
         * return an array of the error response.
         */
        if (!$userMembership || !$appointeeMembership || 0 == $userMembership->getAuthLevel()) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $task = new Task();

        /**
         * Create the new Task object with the passed data from the request.
         * If the provided data from the request is invalid and
         * a datetime object can not be created from it
         * throw exception.
         *
         * @see \DateTime
         */
        try {
            $task->setTaskName($data["task_name"])
                ->setTaskDescription($data["task_description"])
                ->setCreatedOn(new \DateTime("now"))
                ->setExpiringOn(new \DateTime($data["expiring_on"]))
                ->setAppointer($user)
                ->setAppointee($appointee)
                ->setGroup($group)
                ->setStatus(0);
        } catch (\Exception $e) {
            return $this->helper->prepareForErrorResponse("Невалидна дата!");
        }

        /**
         * Validate the newly created Task object with validator service
         * and if there are errors return them.
         */
        $errors = $this->helper->validate($task);

        if ($errors) {
            return $errors;
        }

        $this->entityManager->persist($task);
        $this->notificationManager->sendNewTaskNotification($task);

        $this->entityManager->flush();
    
        $this->fcmSender->notifyUserForAppointedTask($task);

        $normalizedTask = $this->helper->generalNormalizer($task);

        return $this->helper->prepareForSuccessResponse($normalizedTask);
    }

    /**
     * Method deleting a task.
     *
     * This method takes the task object, which wants to be deleted,
     * and the authenticated user and
     * checks if the task appointer is the authenticated user and
     * the task is ongoing (yet to be done).
     * If not, return an array of the error response.
     *
     * @param Task $task
     * @param User $user
     * @return array
     */
    public function deleteTask(Task $task, User $user)
    {
        if ($task->getAppointer() === $user && 0 === $task->getStatus()) {
            $this->entityManager->remove($task);
            $this->entityManager->flush();

            return $this->helper->prepareForSuccessResponse([
                'status' => "success",
                'task' => self::META_DELETED
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method marking the task as done.
     *
     * This method task object, which wants to be marked as done,
     * and the authenticated user and
     * checks if the appointee is the authenticated user and
     * the task is ongoing (yet to be done).
     * If not, return an array of the error response.
     *
     * @param Task $task
     * @param User $user
     * @return array
     */
    public function markTaskAsDone(Task $task, User $user)
    {
        if ($task->getAppointee() === $user && 0 === $task->getStatus()) {
            $task->setStatus(1);

            $this->entityManager->persist($task);
            $this->notificationManager->sendChangedTaskNotification($task);

            $this->entityManager->flush();

            $this->fcmSender->notifyUserForChangedTask($task);

            return $this->helper->prepareForSuccessResponse([
                'status' => "success",
                'task' => "done"
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * * Method marking the task as done.
     *
     * This method task object, which wants to be marked as unfinished,
     * and the authenticated user and
     * checks if the appointee is the authenticated user and
     * the task is ongoing (yet to be done).
     * If not, return an array of the error response.
     *
     * @param Task $task
     * @param User $user
     * @return array
     */
    public function markTaskAsUnfinished(Task $task, User $user)
    {
        if ($task->getAppointee() === $user && 0 === $task->getStatus()) {
            $task->setStatus(2);

            $this->entityManager->persist($task);
            $this->notificationManager->sendChangedTaskNotification($task);

            $this->entityManager->flush();

            $this->fcmSender->notifyUserForChangedTask($task);
            
            return $this->helper->prepareForSuccessResponse([
                'status' => "success",
                'task' => "unfinished"
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method taking the task object and returning an array of it.
     *
     * @param Task $task
     * @return array
     */
    public function showTask(Task $task)
    {
        $normalizedTask = $this->helper->generalNormalizer($task);

        return $this->helper->prepareForSuccessResponse($normalizedTask);
    }

    /**
     * Method showing the tasks sent by the authenticated user.
     *
     * @param User $user
     * @return array
     */
    public function showOngoingTasks(User $user)
    {
        $tasks = $this->entityManager->getRepository(Task::class)->findOngoingTasks($user->getId());
        $normalizedInvitations = $this->helper->generalNormalizer($tasks);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }

    /**
     * Method showing the appointed tasks for the authenticated user.
     *
     * @param User $user
     * @return array
     */
    public function showAppointedTasks(User $user)
    {
        $tasks = $this->entityManager->getRepository(Task::class)->findAppointedTasks($user->getId());
        $normalizedInvitations = $this->helper->generalNormalizer($tasks);

        return $this->helper->prepareForSuccessResponse($normalizedInvitations);
    }

    public function warnUserForExpiringTasks(User $user)
    {
        $tasks = $this->entityManager->getRepository(Task::class)->findAppointedTasks($user->getId());
        $now = new \DateTime();
        $taskCount = 0;
        
        foreach ($tasks as $task) {
            $dateDiff = date_diff($now, $task->getExpiringOn());
            $days = (int) $dateDiff->format('%a');
            
            if ($days < 7) {
                $taskCount++;
            }
        }

        if ($taskCount > 0) {
            $this->fcmSender->notifyUserForExpiringTasks($taskCount, $user);
            $this->notificationManager->sendExpiringTasksNotification($taskCount, $user);
        }
        
        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS
        ]);
    }

    /* Function responsible for automatically marking the tasks
     * as unfinished when they exceeded the expiring date.
     * 
    public function markExpiredTasksAsUnfinished(User $user)
    {
        $tasks = $this->entityManager->getRepository(Task::class)->findAppointedTasks($user->getId());
        $now = new \DateTime();
        
        foreach ($tasks as $task) {
            $dateDiff = date_diff($now, $task->getExpiringOn());
            $days = (int) $dateDiff->format('%a');
            
            if ($days < 0) {
                $task->setStatus(2);
        
                $this->entityManager->persist($task);
            }
        }

        $this->entityManager->flush();
        
        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS
        ]);
    }
    */

    public function getTasksStatistics(User $user)
    {
        $tasks = $this->entityManager->getRepository(Task::class)->findAllUserTasks($user->getId());
        $doneTasks = 0;
        $ongoingTasks = 0;
        $unfinishedTasks = 0;
        
        $tasksNumberByGroups = [];

        foreach ($tasks as $task) {
            $taskGroupName = $task->getGroup()->getGroupName();
            $taskStatus = $task->getStatus();

            if (array_key_exists($taskGroupName, $tasksNumberByGroups)) {
                $tasksNumberByGroups[$taskGroupName]++;
            } else {
                $tasksNumberByGroups[$taskGroupName] = 1;
            }
            
            if ($taskStatus == 0) {
                $ongoingTasks++;
            } elseif ($taskStatus == 1) {
                $doneTasks++;
            } else {
                $unfinishedTasks++;
            }
        }

        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS,
            "tasks_by_status" => [
                "ongoing" => $ongoingTasks,
                "done" => $doneTasks,
                "unfinished" => $unfinishedTasks,
            ],
            "tasks_by_groups" => $tasksNumberByGroups
        ]);
    }
}