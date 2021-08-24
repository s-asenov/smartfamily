<?php

namespace App\Repository;

use App\Entity\UserInvitation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class UserInvitationRepository
 *
 * This class directly interacts with the DB's table `user_invitations`.
 *
 * @method UserInvitation|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserInvitation|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserInvitation[]    findAll()
 * @method UserInvitation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserInvitationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserInvitation::class);
    }

    public function findExistingInvitation($inviter, $invited)
    {
        return $this->createQueryBuilder('ui')
            ->andWhere('ui.inviter = :inviter')
            ->andWhere('ui.invited = :invited')
            ->andWhere('ui.status = :status')
            ->setParameters(['inviter' => $inviter, 'invited' => $invited, 'status' => 0])
            ->getQuery()
            ->getResult();
    }

    public function findUserInvitations($inviter)
    {
        return $this->createQueryBuilder('ui')
            ->andWhere('ui.inviter = :inviter')
            ->andWhere('ui.status = :status')
            ->setParameters(['inviter' => $inviter, 'status' => 0])
            ->getQuery()
            ->getResult();
    }

    public function findPendingInvitations($invited)
    {
        return $this->createQueryBuilder('ui')
            ->andWhere('ui.invited = :invited')
            ->andWhere('ui.status = :status')
            ->setParameters(['invited' => $invited, 'status' => 0])
            ->getQuery()
            ->getResult();
    }

}
