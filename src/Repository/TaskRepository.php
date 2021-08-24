<?php

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class TaskRepository
 *
 * This class directly interacts with the DB's table `tasks`.
 *
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function findOngoingTasks($appointee)
    {
        return $this->createQueryBuilder('task')
            ->andWhere('task.appointee = :appointee')
            ->andWhere('task.status = :status')
            ->setParameter('appointee', $appointee)
            ->setParameter('status', 0)
            ->getQuery()
            ->getResult();
    }

    public function findAppointedTasks($appointer)
    {
        return $this->createQueryBuilder('task')
            ->andWhere('task.appointer = :appointer')
            ->andWhere('task.status = :status')
            ->setParameter('appointer', $appointer)
            ->setParameter('status', 0)
            ->getQuery()
            ->getResult();
    }

    public function findAllUserTasks($appointee)
    {
        return $this->createQueryBuilder('task')
            ->andWhere('task.appointee = :appointee')
            ->setParameter('appointee', $appointee)
            ->getQuery()
            ->getResult();
    }

    public function deleteAllTasks($groupId)
    {
        return $this->createQueryBuilder('task')
            ->delete('App:Task', 'task')
            ->where('task.group = :group')
            ->setParameter('group', $groupId)
            ->getQuery()
            ->getResult();
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
