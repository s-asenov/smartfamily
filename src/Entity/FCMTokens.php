<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="fcm_tokens")
 * @ORM\Entity(repositoryClass="App\Repository\FCMTokensRepository")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class FCMTokens
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, name="fcm_token")
     */
    private $fcmToken;

    /**
     * @ORM\Column(type="boolean", name="is_active")
     */
    private $isActive;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFcmToken(): ?string
    {
        return $this->fcmToken;
    }

    public function setFcmToken(string $fcmToken): self
    {
        $this->fcmToken = $fcmToken;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

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
}
