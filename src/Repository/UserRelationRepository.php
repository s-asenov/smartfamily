<?php

namespace App\Repository;

use App\Entity\UserRelation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class UserRelationRepository
 *
 * This class directly interacts with the DB's table `user_relations`.
 *
 * @method UserRelation|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserRelation|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserRelation[]    findAll()
 * @method UserRelation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserRelationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserRelation::class);
    }

    public function deleteRelations($userId, $friendId)
    {
        return $this->createQueryBuilder('ur')
            ->delete('App:UserRelation', 'ur')
            ->where('ur.user = :user AND ur.friend = :friend')
            ->orWhere('ur.user = :friend AND ur.friend = :user')
            ->setParameter('user', $userId)
            ->setParameter('friend', $friendId)
            ->getQuery()
            ->getResult();
    }

    public function findUserRelations($userId)
    {
        return $this->createQueryBuilder('ur')
            ->andWhere('ur.user = :user')
            ->setParameter('user', $userId)
            ->getQuery()
            ->getResult();
    }

    public function findUserChildren($userId)
    {
        return $this->createQueryBuilder('ur')
            ->andWhere('ur.user = :user')
            ->andWhere('ur.friendIsChild = :isChild')
            ->setParameters(['user' => $userId, 'isChild' => 1])
            ->getQuery()
            ->getResult();
    }

    public function findUserParents($userId)
    {
        return $this->createQueryBuilder('ur')
            ->andWhere('ur.friend = :user')
            ->andWhere('ur.friendIsChild = :isChild')
            ->setParameters(['user' => $userId, 'isChild' => 1])
            ->getQuery()
            ->getResult();
    }

    public function findRelation($userId, $friendId)
    {
        return $this->createQueryBuilder('ur')
            ->andWhere('ur.user = :user')
            ->andWhere('ur.friend = :friend')
            ->setParameter('user', $userId)
            ->setParameter('friend', $friendId)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
