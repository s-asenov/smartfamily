<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class UserRepository
 *
 * This class directly interacts with the DB's table `users`.
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findByToken($token): ?User
    {
        return $this->createQueryBuilder('user')
            ->andWhere('user.token = :token')
            ->setParameter('token', $token)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByEmail($email): ?User
    {
        return $this->createQueryBuilder('user')
            ->andWhere('user.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByInput($input)
    {
        return $this->createQueryBuilder('user')
            ->orWhere('user.firstName LIKE :input')
            ->orWhere('user.lastName LIKE :input')
            ->orWhere('user.username LIKE :input')
            ->setParameter('input', '%'.$input.'%')
            ->getQuery()
            ->getResult();
    }

}
