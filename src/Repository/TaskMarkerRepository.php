<?php

namespace App\Repository;

use App\Entity\TaskMarker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method TaskMarker|null find($id, $lockMode = null, $lockVersion = null)
 * @method TaskMarker|null findOneBy(array $criteria, array $orderBy = null)
 * @method TaskMarker[]    findAll()
 * @method TaskMarker[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskMarkerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TaskMarker::class);
    }

    public function findTaskMarkers($task)
    {
        return $this->createQueryBuilder('tm')
            ->andWhere('tm.task = :task')
            ->setParameter('task', $task)
            ->getQuery()
            ->getResult();
    }
}
