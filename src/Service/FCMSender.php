<?php

namespace App\Service;

use App\Entity\GroupInvitation;
use App\Entity\GroupMembership;
use App\Entity\Task;
use App\Entity\User;
use App\Entity\UserInvitation;
use App\Entity\UserRelation;
use App\Service\Manager\FCMTokenManager;
use Kreait\Firebase\Exception\FirebaseException;
use Kreait\Firebase\Exception\MessagingException;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Exception\Messaging\InvalidMessage;

class FCMSender {
    private $messaging;
    private $fcmTokenManager;
    private $baseUrl;

    public function __construct(Factory $factory, FCMTokenManager $fcmTokenManager)
    {
        $myFactory = (new Factory)->withServiceAccount(__DIR__.'./../../fcm-config.json');

        $this->factory = $myFactory;
        $this->messaging = $myFactory->createMessaging();
        $this->fcmTokenManager = $fcmTokenManager;
        $this->baseUrl = "https://smartfamily.noit.eu/";
    }

    public function notifyUserForUserInvitation(UserInvitation $userInvitation)
    {
        $inviter = $userInvitation->getInviter();   
        $invited = $userInvitation->getInvited();

        $inviterFullName = "{$inviter->getFirstName()} {$inviter->getLastName()}";
        
        $invitedIsChild =  $userInvitation->getInvitedIsChild();
        $invitedTokens = $this->fcmTokenManager->getUserActiveTokens($invited);

        if (0 == $invitedIsChild) {
            $invitedStatus = "приятел";
        } else {
            $invitedStatus = "дете";
        }

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Нова покана!",
                'body' => "{$inviterFullName} ви покани като {$invitedStatus}!",
                'url' => "{$this->baseUrl}platform/user-invitations/pending"
            ]
        ]);

        try {
            $this->messaging->sendMulticast($message, $invitedTokens);
        } catch(\Exception $e){
            return null;
            // throw $e;
        }    
    }

    public function notifyUserForGroupInvitation(GroupInvitation $groupInvitation)
    {
        $inviter = $groupInvitation->getInviter();
        $invited = $groupInvitation->getInvited();
        $group = $groupInvitation->getGroup();

        $inviterFullName = "{$inviter->getFirstName()} {$inviter->getLastName()}";
        $groupName = $group->getGroupName();

        $invitedTokens = $this->fcmTokenManager->getUserActiveTokens($invited);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Нова покана!",
                'body' => "{$inviterFullName} ви покани за членство в група {$groupName}!",
                'url' => "{$this->baseUrl}platform/group-invitations/pending"
            ]
        ]);

        try {
            $this->messaging->sendMulticast($message, $invitedTokens);
        } catch(\Exception $e) {
            return null;
            // throw $e;
        } 
    }

    public function notifyUserForAppointedTask(Task $task)
    {
        $appointer = $task->getAppointer();
        $appointee = $task->getAppointee();

        $appointerFullName = "{$appointer->getFirstName()} {$appointer->getLastName()}";
        $taskName = $task->getTaskName();

        $appointeeTokens = $this->fcmTokenManager->getUserActiveTokens($appointee);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Възложена задача!",
                'body' => "{$appointerFullName} ви възложи задача - {$taskName}!",
                'url' => "{$this->baseUrl}platform/tasks/pending"
            ]
        ]);

        try {
            $this->messaging->sendMulticast($message, $appointeeTokens);
        } catch(\Exception $e){
            return null;
            // throw $e;
        }    
    }

    public function notifyUserForChangedTask(Task $task)
    {
        $appointer = $task->getAppointer();
        $appointee = $task->getAppointee();

        $appointeeFullName = "{$appointee->getFirstName()} {$appointee->getLastName()}";
        $taskName = $task->getTaskName();
        
        if ($task->getStatus() == 1) {
            $taskStatus = "изпълнена";
        } else {
            $taskStatus = "неизпълнена";
        }

        $appointerTokens = $this->fcmTokenManager->getUserActiveTokens($appointer);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Променена задача!",
                'body' => "{$appointeeFullName} маркира задача {$taskName} като {$taskStatus}!",
                'url' => "{$this->baseUrl}platform/tasks/sent"
            ]
        ]);

        try {
            $this->messaging->sendMulticast($message, $appointerTokens);
        } catch(\Exception $e){
            return null;
            // throw $e;
        }
    }

    public function notifyUserForNewFriend(UserRelation $userRelation)
    {
        $user = $userRelation->getUser();
        $friend = $userRelation->getFriend();
        $friendIsChild = $userRelation->getFriendIsChild();

        if (0 == $friendIsChild) {
            $relationType = "приятел";
        } elseif (1 == $friendIsChild) {
            $relationType = "родител";
        } else {
            $relationType = "дете";
        }

        $userFullName = "{$user->getFirstName()} {$user->getLastName()}";
        $friendTokens = $this->fcmTokenManager->getUserActiveTokens($friend);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Нова връзка!",
                'body' => "Вече сте свързани с {$userFullName} като {$relationType}!",
                'url' => "{$this->baseUrl}platform/friends"
            ]
        ]);

        try {
            $this->messaging->sendMulticast($message, $friendTokens);
        } catch(\Exception $e){
            return null;
            // throw $e;
        }
    }

    public function notifyUserForNewGroup(GroupMembership $groupMembership)
    {
        $user = $groupMembership->getUser();
        $group = $groupMembership->getGroup();

        $userTokens = $this->fcmTokenManager->getUserActiveTokens($user);

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Ново членство!",
                'body' => "Вече сте член на група {$group->getGroupName()}!",
                'url' => "{$this->baseUrl}platform/group/{$group->getGroupName()}"
            ]
        ]);
        
        try {
            $this->messaging->sendMulticast($message, $userTokens);
            // echo 'Successful sends: '.$report->successes()->count().PHP_EOL;
            // echo 'Failed sends: '.$report->failures()->count().PHP_EOL;
        } catch(InvalidMessage $e){
            return null;
            // print_r($e->errors());
            // throw $e;
        }
    }

    public function notifyUserForExpiringTasks($taskCount, User $user)
    {
        $userTokens = $this->fcmTokenManager->getUserActiveTokens($user);

        if ($taskCount === 1) {
            $body = "Имате {$taskCount} скоро изтащa задачa!";
        } else {
            $body = "Имате {$taskCount} скоро изтащи задачи!"; 
        }

        $message = CloudMessage::fromArray([
            'data' => [
                'title' => "Имате изтичащи задачи!",
                'body' => $body,
                'url' => "{$this->baseUrl}platform/tasks/pending"
            ]
        ]);
        
        try {
            $this->messaging->sendMulticast($message, $userTokens);
        } catch(\Exception $e){
            return null;
            // throw $e;
        }  
    }
}