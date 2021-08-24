<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_group_invitations")
 * @ORM\Entity(repositoryClass="App\Repository\GroupInvitationRepository")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupInvitation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="invited_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $invited;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="inviter_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $inviter;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $group;

    /**
     * @ORM\Column(name="status", type="tinyint", length=1)
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getInviter(): ?User
    {
        return $this->inviter;
    }

    public function setInviter(?User $inviter): self
    {
        $this->inviter = $inviter;

        return $this;
    }

    public function getGroup(): ?Group
    {
        return $this->group;
    }

    public function setGroup(?Group $group): self
    {
        $this->group = $group;

        return $this;
    }

    public function getInvited(): ?User
    {
        return $this->invited;
    }

    public function setInvited(?User $invited): self
    {
        $this->invited = $invited;

        return $this;
    }
}
