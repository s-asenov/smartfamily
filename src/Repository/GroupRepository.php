<?php

namespace App\Repository;

use App\Entity\Group;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class GroupRepository
 *
 * This class directly interacts with the DB's table `groups`.
 *
 * @method Group|null find($id, $lockMode = null, $lockVersion = null)
 * @method Group|null findOneBy(array $criteria, array $orderBy = null)
 * @method Group[]    findAll()
 * @method Group[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Group::class);
    }

    public function findGroup($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.groupName = :group')
            ->orWhere('g.id = :group')
            ->setParameter('group', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }
}