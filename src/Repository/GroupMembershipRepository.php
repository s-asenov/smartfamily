<?php

namespace App\Repository;

use App\Entity\GroupMembership;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class GroupMembershipRepository
 *
 * This class directly interacts with the DB's table `group_memberships`.
 *
 * @method GroupMembership|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupMembership|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupMembership[]    findAll()
 * @method GroupMembership[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupMembershipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupMembership::class);
    }

//    public function findMembership($userId, $groupId): ?GroupMembership
//    {
//        return $this->createQueryBuilder('gm')
//            ->andWhere('gm.user = :user')
//            ->andWhere('gm.group = :group')
//            ->setParameter('user', $userId)
//            ->setParameter('group', $groupId)
//            ->getQuery()
//            ->getOneOrNullResult();
//    }

    public function findUserGroups($userId)
    {
        return $this->createQueryBuilder('gm')
            ->andWhere('gm.user = :user')
            ->setParameter('user', $userId)
            ->getQuery()
            ->getResult();
    }

    public function findUsersInGroup($groupId)
    {
        return $this->createQueryBuilder('gm')
            ->andWhere('gm.group = :group')
            ->setParameter('group', $groupId)
            ->getQuery()
            ->getResult();
    }

    public function findUserInGroup($userId, $groupId): ?GroupMembership
    {
        return $this->createQueryBuilder('gm')
            ->andWhere('gm.group = :group')
            ->andWhere('gm.user = :user')
            ->setParameter('group', $groupId)
            ->setParameter('user', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function deleteAllMemberships($groupId)
    {
        return $this->createQueryBuilder('gm')
            ->delete('App:GroupMembership', 'gm')
            ->where('gm.group = :group')
            ->setParameter('group', $groupId)
            ->getQuery()
            ->getResult();
    }
}
