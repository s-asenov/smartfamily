<?php

namespace App\Service\Manager;

use App\Entity\GroupInvitation;
use App\Entity\GroupMembership;
use App\Entity\Notification;
use App\Entity\Task;
use App\Entity\User;
use App\Entity\UserInvitation;
use App\Entity\UserRelation;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;


/**
 * Class NotificationManager
 *
 * This class is responsible for the logic behind the notifications saved in the DB.
 *
 * @see Notification
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class NotificationManager extends ObjectManager {

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper)
    {
        parent::__construct($entityManager, $helper);
    }

    public function sendWelcomeNotification(User $user)
    {
        $notification = new Notification();

        $notification->setSender(null)
                    ->setReceiver($user)
                    ->setInfo("Добре дошли в платформата за пестене на време Smartfamily!") 
                    ->setAdditionalInfo("welcome")
                    ->setDate(new \DateTime())
                    ->setStatus(0);

        $this->entityManager->persist($notification);
    }

    public function sendUserInvitationNotification(UserInvitation $invitation)
    {
        $notification = new Notification();

        $inviter = $invitation->getInviter();   
        $invited = $invitation->getInvited();

        $invited = $invitation->getInvited();

        $inviterFullName = "{$inviter->getFirstName()} {$inviter->getLastName()}";

        if (0 == $invitation->getInvitedIsChild()) {
            $invitedStatus = "приятел";
        } else {
            $invitedStatus = "дете";
        }

        $notification->setSender($inviter)
            ->setReceiver($invited)
            ->setInfo("{$inviterFullName} ви изпрати покана като {$invitedStatus}!")
            ->setAdditionalInfo("user_invitation")
            ->setDate(new \DateTime())
            ->setStatus(0);
 
        $this->entityManager->persist($notification);
    }

    public function sendGroupInvitationNotification(GroupInvitation $invitation)
    {
        $notification = new Notification();

        $inviter = $invitation->getInviter();
        $invited = $invitation->getInvited();
        $group = $invitation->getGroup();

        $inviterFullName = "{$inviter->getFirstName()} {$inviter->getLastName()}";
        $groupName = $group->getGroupName();

        $invited = $invitation->getInvited();
        $group = $invitation->getGroup();

        $inviterFullName = "{$inviter->getFirstName()} {$inviter->getLastName()}";
        $groupName = $group->getGroupName();

        $notification->setSender($inviter)
            ->setReceiver($invited)
            ->setInfo("{$inviterFullName} ви покани за членство в група {$groupName}!")
            ->setAdditionalInfo("group_invitation")
            ->setDate(new \DateTime())
            ->setStatus(0); 

        $this->entityManager->persist($notification);
    }

    public function sendNewTaskNotification(Task $task)
    {
        $notification = new Notification();

        $appointer = $task->getAppointer();
        $appointee = $task->getAppointee();

        $taskName = $task->getTaskName();
        $appointerFullName = "{$appointer->getFirstName()} {$appointer->getLastName()}";

        $notification->setSender($appointer)
            ->setReceiver($appointee)
            ->setInfo("{$appointerFullName} ви възложи задача - {$taskName}!")
            ->setAdditionalInfo("task")
            ->setDate(new \DateTime())
            ->setStatus(0);    
            
        $this->entityManager->persist($notification);
    }

    public function sendChangedTaskNotification(Task $task)
    {
        $notification = new Notification();

        $appointer = $task->getAppointer();
        $appointee = $task->getAppointee();

        $appointeeFullName = "{$appointee->getFirstName()} {$appointee->getLastName()}";
        $taskName = $task->getTaskName();
        
        if ($task->getStatus() == 1) {
            $taskStatus = "изпълнена";
        } else {
            $taskStatus = "неизпълнена";
        }

        $notification->setSender($appointee)
            ->setReceiver($appointer)
            ->setInfo("{$appointeeFullName} маркира задача {$taskName} като {$taskStatus}!")
            ->setAdditionalInfo("task")
            ->setDate(new \DateTime())
            ->setStatus(0);  

        $this->entityManager->persist($notification);
    }

    public function sendNewRelationNotification(UserRelation $relation)
    {
        $notification = new Notification();

        $user = $relation->getUser();
        $friend = $relation->getFriend();

        $friendIsChild = $relation->getFriendIsChild();
        $userFullName = "{$user->getFirstName()} {$user->getLastName()}";

        if (0 == $friendIsChild) {
            $relationType = "приятел";
        } elseif (1 == $friendIsChild) {
            $relationType = "родител";
        } else {
            $relationType = "дете";
        }

        if (0 == $friendIsChild) {
            $relationType = "приятел";
        } elseif (1 == $friendIsChild) {
            $relationType = "родител";
        } else {
            $relationType = "дете";
        }

        $notification->setSender($user)
            ->setReceiver($friend)
            ->setInfo("Вече сте свързани с {$userFullName} като {$relationType}!")
            ->setAdditionalInfo("relation")
            ->setDate(new \DateTime())
            ->setStatus(0);            

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    public function sendNewGroupNotification(GroupMembership $groupMembership)
    {
        $notification = new Notification();

        $user = $groupMembership->getUser();
        $group = $groupMembership->getGroup();

        $groupName = $group->getGroupName();
                
        $notification->setSender(null)
            ->setReceiver($user)
            ->setInfo("Вече сте член на група {$groupName}!")
            ->setAdditionalInfo($groupName)
            ->setDate(new \DateTime())
            ->setStatus(0);  

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    public function sendExpiringTasksNotification($taskCount, User $user)
    {
        $notification = new Notification();

        if ($taskCount === 1) {
            $message = "Имате {$taskCount} скоро изтащa задачa!";
        } else {
            $message = "Имате {$taskCount} скоро изтащи задачи!"; 
        }


        $notification->setSender(null)
            ->setReceiver($user)
            ->setInfo($message)
            ->setAdditionalInfo("task")
            ->setDate(new \DateTime())
            ->setStatus(0);  

        $this->entityManager->persist($notification);
        $this->entityManager->flush(); 
    }
    
    /**
     * Method marking the notification as read.
     *
     * This method takes the notification object and the authenticated user
     * and handles the logic.
     *
     * @param Notification $notification
     * @param Notification $notification
     * @return null
     */
    public function readNotification(Notification $notification, User $user)
    {
        if ($notification->getReceiver() !== $user) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        $notification->setStatus(1);
        
        $this->entityManager->persist($notification);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            "status" => self::META_SUCCESS,
            "notification" => "read"
        ]);
    }

    /**
     * Method returning the unread notifications of the authenticated user.
     * 
     * @param User $user
     * @return array
     */
    public function getUserNotifications(User $user)
    {
        $notifications = $this->entityManager->getRepository(Notification::class)->findAllUserNotifications($user->getId());
        $normalizedNotification = $this->helper->generalNormalizer($notifications);

        return $this->helper->prepareForSuccessResponse($normalizedNotification);
    }
}
