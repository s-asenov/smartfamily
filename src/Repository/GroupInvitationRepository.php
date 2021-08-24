<?php

namespace App\Repository;

use App\Entity\GroupInvitation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * Class GroupInvitationRepository
 *
 * This class directly interacts with the DB's table `group_invitations`.
 *
 * @method GroupInvitation|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupInvitation|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupInvitation[]    findAll()
 * @method GroupInvitation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupInvitationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupInvitation::class);
    }

    public function findOutgoingGroupInvitations($inviter)
    {
        return $this->createQueryBuilder('gi')
            ->andWhere('gi.inviter = :inviter')
            ->andWhere('gi.status = :status')
            ->setParameters(['inviter' => $inviter, 'status' => 0])
            ->getQuery()
            ->getResult();
    }

    public function findPendingInvitations($invited)
    {
        return $this->createQueryBuilder('gi')
            ->andWhere('gi.invited = :invited')
            ->andWhere('gi.status = :status')
            ->setParameters(['invited' => $invited, 'status' => 0])
            ->getQuery()
            ->getResult();
    }

    public function findExistingInvitation($inviterId, $invitedId, $groupId)
    {
        return $this->createQueryBuilder('gi')
            ->andWhere('gi.inviter = :inviter')
            ->andWhere('gi.group = :group')
            ->andWhere('gi.invited = :invited')
            ->andWhere('gi.status = :status')
            ->setParameters(['inviter' => $inviterId, 'invited' => $invitedId, 'status' => 0, 'group' => $groupId])
            ->getQuery()
            ->getResult();
    }
}