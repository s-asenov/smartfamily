<?php


namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Class BaseApiController
 * Provides method(s) used in the child controllers.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class BaseApiController extends AbstractController
{
    /**
     * Helpful method allowing to auto-complete user's methods.
     *
     * @return User|null
     */
    public function getUser() :?User
    {
        return parent::getUser();
    }



}