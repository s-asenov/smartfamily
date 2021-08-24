<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *  @ORM\Table(name="task_markers")
 * 
 * @ORM\Entity(repositoryClass="App\Repository\TaskMarkerRepository")
 */
class TaskMarker
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Task")
     * @ORM\JoinColumn(name="task_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $task;

    /**
     * @ORM\Column(name="lat", type="string", length=255)
     */
    private $lat;

    /**
     * @ORM\Column(name="lng", type="string", length=255)
     */
    private $lng;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?string
    {
        return $this->lng;
    }

    public function setLng(string $lng): self
    {
        $this->lng = $lng;

        return $this;
    }

    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(?Task $task): self
    {
        $this->task = $task;

        return $this;
    }
}
