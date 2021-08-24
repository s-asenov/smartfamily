<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Table(name="user_groups")
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 * @UniqueEntity(fields={"groupName"}, message="Името на групата вече е заето!")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class Group
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="group_name", type="string", length=30, unique=true)
     *
     * @Assert\NotBlank(message="Името на групата не може да бъде празно!")
     * @Assert\Length(
     *      min = 2,
     *      max = 30,
     *      minMessage = "Името на групата трябва да бъде поне {{ limit }} символа!",
     *      maxMessage = "Името на групата не може да бъде повече от {{ limit }} символа!"
     * )
     */
    private $groupName;

    /**
     * @ORM\Column(name="group_description", type="text", length=400)
     *
     * @Assert\NotBlank(message="Описанието на групата не може да бъде празно!")
     * @Assert\Length(
     *     min="10",
     *     max="400",
     *     minMessage = "Описанието на групата трябва да бъде поне {{ limit }} символа!",
     *     maxMessage = "Описанието на групата не може да бъде повече от {{ limit }} символа!"
     * )
     */
    private $groupDescription;

    /**
     * @ORM\Column(name="group_img", type="string", nullable=true)
     */
    private $groupImg;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGroupName(): ?string
    {
        return $this->groupName;
    }

    public function setGroupName(string $groupName): self
    {
        $this->groupName = $groupName;

        return $this;
    }

    public function getGroupDescription(): ?string
    {
        return $this->groupDescription;
    }

    public function setGroupDescription(string $groupDescription): self
    {
        $this->groupDescription = $groupDescription;

        return $this;
    }

    public function getGroupImg(): ?string
    {
        return $this->groupImg;
    }

    public function setGroupImg(?string $groupImg): self
    {
        $this->groupImg = $groupImg;

        return $this;
    }
}
