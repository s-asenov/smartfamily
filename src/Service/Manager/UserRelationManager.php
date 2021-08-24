<?php


namespace App\Service\Manager;


use App\Entity\User;
use App\Entity\UserRelation;
use App\Service\ApiHelper;
use App\Service\FCMSender;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class UserRelationManager
 *
 * This class is responsible for the logic behind the UserRelation objects.
 *
 * @see UserRelation
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserRelationManager extends ObjectManager
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
     * Method responsible for the creation of the relations between user.
     *
     * This method takes the inviter user, the invited user and an integer
     * identifying if the invited is child and handles the logic.
     *
     * @param User $inviter
     * @param User $invited
     * @param int $invitedIsChild
     */
    public function addRelations(User $inviter, User $invited, int $invitedIsChild)
    {
        // Create an array with both users.
        $friends = [$inviter, $invited];

        /**
         * Looping through both users and executing a switch statement,
         * which is responsible for creating the user relations.
         */
        foreach ($friends as $friend) {
            switch ($friend) {
                /**
                 * If the user is the inviter one,
                 * create a new UserRelation object with
                 * the identifying integer.
                 */
                case $inviter:
                    $relation = new UserRelation();
                    $relation->setUser($inviter)
                        ->setFriend($invited)
                        ->setFriendIsChild($invitedIsChild);

                    $this->entityManager->persist($relation);
                    
                    break;
                /**
                 * If the user is the invited one,
                 * create a new UserRelation object and
                 * if the identifying integer is equal to 1 
                 * (showing that the relation is one of a parent and child)
                 * set the friendIsChild property to 2 - meaning child,
                 * else create a relation between two friends - 0.
                 */
                case $invited:
                    if (1 === $invitedIsChild) {
                        $friendIsChild = 2;
                    } else {
                        $friendIsChild = 0;
                    }

                    $relation = new UserRelation();
                    $relation->setUser($invited)
                        ->setFriend($inviter)
                        ->setFriendIsChild($friendIsChild);

                    $this->entityManager->persist($relation);
                    
                    $this->fcmSender->notifyUserForNewFriend($relation);
                    $this->notificationManager->sendNewRelationNotification($relation);

                    break;
            }

            $this->entityManager->flush();
        }
    }

    /**
     * Method deleting relations between users.
     *
     * This method takes the authenticated user and UserRelation object
     * and handles the logic.
     *
     * @param User $user
     * @param UserRelation $relation
     * @return array
     */
    public function deleteRelation(User $user, UserRelation $relation)
    {
        $relationUser = $relation->getUser();
        $relationFriend = $relation->getFriend();
        $repository = $this->entityManager->getRepository(UserRelation::class);

        /**
         * If the user from the UserRelation object and the authenticated user is the same and
         * the authenticated user is not a child,
         * delete the relations between the users.
         */
        if ($relationUser === $user && 2 != $relation->getFriendIsChild()) {
            $repository->deleteRelations($relationUser->getId(), $relationFriend->getId());

            return $this->helper->prepareForSuccessResponse([
                'status' => self::META_SUCCESS,
                'relations' => self::META_DELETED
            ]);
        }

        return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
    }

    /**
     * Method showing the relations of an user.
     *
     * @param User $user
     * @return array of the *normalized* user relations
     */
    public function showUserRelations(User $user)
    {
        $repository = $this->entityManager->getRepository(UserRelation::class);
        $relations = $repository->findUserRelations($user->getId());

        $normalizedRelations = $this->helper->generalNormalizer($relations);

        return $this->helper->prepareForSuccessResponse($normalizedRelations);
    }

    /**
     * Method getting the relations between two users.
     *
     * @param User $user
     * @param User $friend
     * @return mixed
     */
    public function checkUserRelations(User $user, User $friend)
    {
        $repository = $this->entityManager->getRepository(UserRelation::class);

        return $repository->findRelation($user, $friend);
    }
}