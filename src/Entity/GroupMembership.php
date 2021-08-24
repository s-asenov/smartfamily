<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_group_memberships")
 * @ORM\Entity(repositoryClass="App\Repository\GroupMembershipRepository")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupMembership
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $group;

    /**
     * @ORM\Column(name="auth_level", type="tinyint", length=1)
     */
    private $authLevel;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthLevel(): ?int
    {
        return $this->authLevel;
    }

    public function setAuthLevel(int $authLevel): self
    {
        $this->authLevel = $authLevel;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
}
