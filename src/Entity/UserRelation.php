<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_relations")
 * @ORM\Entity(repositoryClass="App\Repository\UserRelationRepository")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class UserRelation
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
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="friend_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $friend;

    /**
     * @ORM\Column(name="friend_is_child", type="smallint")
     */
    private $friendIsChild;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFriendIsChild(): ?int
    {
        return $this->friendIsChild;
    }

    public function setFriendIsChild(int $friendIsChild): self
    {
        $this->friendIsChild = $friendIsChild;

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

    public function getFriend(): ?User
    {
        return $this->friend;
    }

    public function setFriend(?User $friend): self
    {
        $this->friend = $friend;

        return $this;
    }
}
