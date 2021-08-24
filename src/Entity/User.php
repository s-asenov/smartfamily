<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields={"email"}, message="Имейлът вече е зает!")
 * @UniqueEntity(fields={"username"}, message="Потребителското име вече е заето!")
 * @UniqueEntity(fields={"token"}, message="Неочаквана грешка!")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="first_name", type="string", length=30)
     *
     * @Assert\NotBlank(message="Името не може да бъде празно!")
     * @Assert\Length(
     *      min = 2,
     *      max = 30,
     *      minMessage = "Името трябва да бъде поне {{ limit }} символа!",
     *      maxMessage = "Името не може да бъде повече {{ limit }} символа!"
     * )
     */
    private $firstName;

    /**
     * @ORM\Column(name="last_name", type="string", length=30)
     *
     * @Assert\NotBlank(message="Фамилията не може да бъде празно!")
     * @Assert\Length(
     *      min = 2,
     *      max = 30,
     *      minMessage = "Фамилията трябва да бъде поне {{ limit }} символа!",
     *      maxMessage = "Фамилията не може да бъде повече от {{ limit }} символа!"
     * )
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=40, unique=true)
     *
     * @Assert\NotBlank(message="Потребителското име не може да бъде празно!")
     * @Assert\Length(
     *     min="4",
     *     max="40",
     *     minMessage="Потребителското име трябва да бъде поне {{ limit }} символа!",
     *     maxMessage="Потребителското име не може да бъде повече от {{ limit }} символа!"
     * )
     */
    private $username;

    /**
     * @ORM\Column(type="string", unique=true)
     *
     * @Assert\Email(message="Невалиден имейл!")
     * @Assert\NotBlank(message="Имейлът не може да бъде празен!")
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     *
     */
    private $password;

    /**
     * @ORM\Column(name="user_img", type="string", nullable=true)
     */
    private $userImg;

    /**
     * @ORM\Column(name="date_created", type="datetime")
     */
    private $dateCreated;

    /**
     * @ORM\Column(name="last_seen", type="datetime")
     */
    private $lastSeen;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    /**
     * @ORM\Column(name="token", length=100, type="string")
     */
    private $token;

    /**
     * @Assert\NotBlank(message="Паролата не може да бъде празна!")
     * @Assert\Length(
     *     min="6",
     *     max="50",
     *     minMessage="Паролата трябва да бъде поне {{ limit }} символа!",
     *     maxMessage="Паролата не може да бъде повече от {{ limit }} символа!"
     * )
     */
    private $newPassword;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getLastSeen(): ?\DateTimeInterface
    {
        return $this->lastSeen;
    }

    public function setLastSeen(\DateTimeInterface $lastSeen): self
    {
        $this->lastSeen = $lastSeen;

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

    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    public function getSalt()
    {

    }

    public function eraseCredentials()
    {
        $this->newPassword = null;

        return $this;
    }

    public function getUserImg(): ?string
    {
        return $this->userImg;
    }

    public function setUserImg(string $userImg): self
    {
        $this->userImg = $userImg;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @Assert\IsTrue(message="Паролата не може да съвпада с други полета!")
     */
    public function isPasswordUnique()
    {
        return !in_array($this->newPassword, [$this->firstName, $this->lastName, $this->username]);
    }

    public function getNewPassword(): ?string
    {
        return $this->newPassword;
    }

    public function setNewPassword(string $newPassword): self
    {
        $this->newPassword = $newPassword;

        return $this;
    }
}
