<?php


namespace App\Serializer\Normalizer;


use App\Entity\Group;
use App\Entity\GroupInvitation;
use App\Entity\GroupMembership;
use App\Entity\Notification;
use App\Entity\Task;
use App\Entity\TaskMarker;
use App\Entity\User;
use App\Entity\UserInvitation;
use App\Entity\UserRelation;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Class MyNormalizer
 *
 * The main normalizer used to *normalize* - turning objects into arrays,
 * all the objects required to be shown on an API response.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class MyNormalizer implements NormalizerInterface
{
    /**
     * Normalizes an object into a set of array.
     *
     * The object runs through switch statement, which checks
     * the instance of the object and then returns array with the corresponding values.
     *
     * @param mixed $object the object waiting normalization
     * @param string|null $format
     * @param array $context array applying special rules during normalization
     * @return array
     */
    public function normalize($object, string $format = null, array $context = [])
    {
        switch ($object) {
            case $object instanceof User:
                return [
                    'id' => $object->getId(),
                    'firstName' => $object->getFirstName(),
                    'lastName' => $object->getLastName(),
                    'username' => $object->getUsername(),
                    'email' => $object->getEmail(),
                    'userImg' => $object->getUserImg(),
                    'isActive' => $object->getIsActive(),
                    'lastSeen' => $this->formatDateToString($object->getLastSeen()),
                    'dateCreated' => $this->formatDateToString($object->getDateCreated())
                ];
            case $object instanceof UserInvitation:
                $invited = $object->getInvited();
                $inviter = $object->getInviter();

                return [
                    'id' => $object->getId(),
                    'inviter_id' => $inviter->getId(),
                    'inviter_firstName' => $inviter->getFirstName(),
                    'inviter_lastName' => $inviter->getLastName(),
                    'inviter_username' => $inviter->getUsername(),
                    'inviter_userImg' => $inviter->getUserImg(),
                    'invited_id' => $invited->getId(),
                    'invited_firstName' => $invited->getFirstName(),
                    'invited_lastName' => $invited->getLastName(),
                    'invited_username' => $invited->getUsername(),
                    'invited_userImg' => $invited->getUserImg(),
                    'status' => $object->getStatus(),
                    'isChild' => $object->getInvitedIsChild()
                ];
            case $object instanceof UserRelation:
                $friend = $object->getFriend();

                return [
                    'id' => $object->getId(),
                    'user' => $object->getUser()->getId(),
                    'friend_id' => $friend->getId(),
                    'friend_firstName' => $friend->getFirstName(),
                    'friend_lastName' => $friend->getLastName(),
                    'friend_username' => $friend->getUsername(),
                    'friend_isActive' => $friend->getIsActive(),
                    'friend_userImg' => $friend->getUserImg(),
                    'friend_lastSeen' => $this->formatDateToString($friend->getLastSeen()),
                    'isChild' => $object->getFriendIsChild()
                ];
            case $object instanceof Group:
                return [
                    'id' => $object->getId(),
                    'groupName' => $object->getGroupName(),
                    'groupDescription' => $object->getGroupDescription(),
                    'groupImg' => $object->getGroupImg()
                ];

            case $object instanceof GroupInvitation:
                $invited = $object->getInvited();
                $inviter = $object->getInviter();
                $group = $object->getGroup();

                return [
                    'id' => $object->getId(),
                    'inviter_id' => $inviter->getId(),
                    'inviter_firstName' => $inviter->getFirstName(),
                    'inviter_lastName' => $inviter->getLastName(),
                    'inviter_username' => $inviter->getUsername(),
                    'inviter_userImg' => $inviter->getUserImg(),
                    'invited_id' => $invited->getId(),
                    'invited_firstName' => $invited->getFirstName(),
                    'invited_lastName' => $invited->getLastName(),
                    'invited_username' => $invited->getUsername(),
                    'invited_userImg' => $invited->getUserImg(),
                    'group_id' => $group->getId(),
                    'groupName' => $group->getGroupName(),
                    'groupDescription' => $group->getGroupDescription(),
                    'groupImg' => $group->getGroupImg(),
                    'status' => $object->getStatus()
                ];
            case $object instanceof GroupMembership:
                $group = $object->getGroup();
                $user = $object->getUser();

                return [
                    'id' => $object->getId(),
                    'user_id' => $user->getId(),
                    'user_firstName' => $user->getFirstName(),
                    'user_lastName' => $user->getLastName(),
                    'user_username' => $user->getUsername(),
                    'user_userImg' => $user->getUserImg(),
                    'user_isActive' => $user->getIsActive(),
                    'user_lastSeen' => $this->formatDateToString($user->getLastSeen()),
                    'group_id' => $group->getId(),
                    'groupName' => $group->getGroupName(),
                    'groupDescription' => $group->getGroupDescription(),
                    'groupImg' => $group->getGroupImg(),
                    'authLevel' => $object->getAuthLevel()
                ];
            case $object instanceof Task:
                $appointer = $object->getAppointer();
                $appointee = $object->getAppointee();
                $group = $object->getGroup();

                return [
                    'id' => $object->getId(),
                    'taskName' => $object->getTaskName(),
                    'taskDescription' => $object->getTaskDescription(),
                    'createdOn' => $this->formatDateToString($object->getCreatedOn()),
                    'expiringOn' => $this->formatDateToString($object->getExpiringOn()),
                    'appointer_id' => $appointer->getId(),
                    'appointer_firstName' => $appointer->getFirstName(),
                    'appointer_lastName' => $appointer->getLastName(),
                    'appointer_username' => $appointer->getUsername(),
                    'appointer_userImg' => $appointer->getUserImg(),
                    'appointee_id' => $appointee->getId(),
                    'appointee_firstName' => $appointee->getFirstName(),
                    'appointee_lastName' => $appointee->getLastName(),
                    'appointee_username' => $appointee->getUsername(),
                    'appointee_userImg' => $appointee->getUserImg(),
                    'group_id' => $group->getId(),
                    'groupName' => $group->getGroupName(),
                    'groupDescription' => $group->getGroupDescription(),
                    'groupImg' => $group->getGroupImg(),
                    'status' => $object->getStatus()
                ];
            case $object instanceof TaskMarker: 
                return [
                    'id' => $object->getId(),
                    'task_id' => $object->getTask()->getId(),
                    'lat' => $object->getLat(),
                    'lng' => $object->getLng()
                ];
            case $object instanceof Notification:
                return [
                    'id' => $object->getId(),
                    'receiver_id' => $object->getReceiver()->getId(),
                    'sender_id' => $object->getSender() instanceof User ? $object->getSender()->getId() : "",
                    'sender_firstName' => $object->getSender() instanceof User ? $object->getSender()->getFirstName() : "",
                    'sender_lastName' => $object->getSender() instanceof User ? $object->getSender()->getLastName() : "",
                    'info' => $object->getInfo(),
                    'additional_info' => $object->getAdditionalInfo() ?? "",
                    'status' => $object->getStatus(),
                    'date' => $this->formatDateToString($object->getDate())
                ];
        }
    }

    /**
     * Checks whether the given class is supported for normalization by this normalizer.
     *
     * @param mixed $data
     * @param string|null $format
     * @return bool|void
     */
    public function supportsNormalization($data, string $format = null)
    {
        return;
    }

    /**
     * Converts datetime to string.
     *
     * @param \DateTimeInterface $time
     * @return string
     */
    public function formatDateToString(\DateTimeInterface $time)
    {
        return $time->format("Y-m-d H:i:s");
    }
}