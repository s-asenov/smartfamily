<?php


namespace App\Service\Manager;


use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class ObjectManager
 *
 * Handles globally needed constants and functionalities.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class ObjectManager
{
    const UNEXPECTED_ERROR = "Неочаквана грешка!";
    const MISSING_DATA = "Липсващи данни!";
    const NO_PERMISSION = "Нямате позволение!";
    const META_SUCCESS = "success";
    const META_DELETED = "deleted";
    const META_ACCEPTED = "accepted";
    const META_REJECTED = "rejected";

    protected $entityManager;
    protected $helper;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper)
    {
        $this->entityManager = $entityManager;
        $this->helper = $helper;
    }
}