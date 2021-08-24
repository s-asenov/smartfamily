<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Table(name="tasks")
 * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class Task
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(name="task_name", type="string", length=30)
     *
     * @Assert\NotBlank(message="Името на задачата не може да бъде празно!")
     * @Assert\Length(
     *      min = 2,
     *      max = 30,
     *      minMessage = "Името на задачата трабва да бъде поне {{ limit }} символа!",
     *      maxMessage = "Името на задачата не трябва да бъде повече от {{ limit }} символа!"
     * )
     */
    private $taskName;

    /**
     * @ORM\Column(name="task_description", type="string", length=255)
     *
     * @Assert\NotBlank(message="Описанието на задачата не може да бъде празно!")
     * @Assert\Length(
     *      min = 4,
     *      max = 250,
     *      minMessage = "Описанието на задачата трябва да бъде поне {{ limit }} символа!",
     *      maxMessage = "Описанието на задачата не трябва да бъде повече от {{ limit }} символа!"
     * )
     */
    private $taskDescription;

    /**
     * @ORM\Column(name="created_on", type="datetime")
     */
    private $createdOn;

    /**
     * @ORM\Column(name="expiring_on", type="datetime")
     */
    private $expiringOn;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="appointer_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $appointer;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="appointee_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $appointee;

    /**
     * @ORM\ManyToOne(targetEntity="Group")
     * @ORM\JoinColumn(name="group_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $group;

    /**
     * @ORM\Column(type="tinyint")
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTaskName(): ?string
    {
        return $this->taskName;
    }

    public function setTaskName(string $taskName): self
    {
        $this->taskName = $taskName;

        return $this;
    }

    public function getTaskDescription(): ?string
    {
        return $this->taskDescription;
    }

    public function setTaskDescription(string $taskDescription): self
    {
        $this->taskDescription = $taskDescription;

        return $this;
    }

    public function getCreatedOn(): ?\DateTimeInterface
    {
        return $this->createdOn;
    }

    public function setCreatedOn(\DateTimeInterface $createdOn): self
    {
        $this->createdOn = $createdOn;

        return $this;
    }

    public function getexpiringOn(): ?\DateTimeInterface
    {
        return $this->expiringOn;
    }

    public function setexpiringOn(\DateTimeInterface $expiringOn): self
    {
        $this->expiringOn = $expiringOn;

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

    public function getAppointer(): ?User
    {
        return $this->appointer;
    }

    public function setAppointer(User $appointer): self
    {
        $this->appointer = $appointer;

        return $this;
    }

    public function getAppointee(): ?User
    {
        return $this->appointee;
    }

    public function setAppointee(User $appointee): self
    {
        $this->appointee = $appointee;

        return $this;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status): self
    {
        $this->status = $status;

        return $this;
    }
}
