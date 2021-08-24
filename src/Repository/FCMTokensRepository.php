<?php

namespace App\Repository;

use App\Entity\FCMToken;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class FCMTokensRepository
 *
 * This class directly interacts with the DB's table `fcm_tokens`.
 *
 * @method FCMToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method FCMToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method FCMToken[]    findAll()
 * @method FCMToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class FCMTokensRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FCMToken::class);
    }

    public function findUserDevice(User $user, $fcmToken)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.user = :user')
            ->andWhere('f.fcmToken = :fcmToken')
            ->setParameter('user', $user)
            ->setParameter('fcmToken', $fcmToken)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findActiveUserDevices(User $user)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.user = :user')
            ->andWhere('f.isActive = :isActive')
            ->setParameter('user', $user)
            ->setParameter('isActive', 1)
            ->getQuery()
            ->getResult();
    }

    public function findUsersWithDevice($fcmToken)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.fcmToken = :fcmToken')
            ->setParameter('fcmToken', $fcmToken)
            ->getQuery()
            ->getResult();
    }



}
