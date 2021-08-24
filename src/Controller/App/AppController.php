<?php


namespace App\Controller\App;


use Kreait\Firebase\Exception\FirebaseException;
use Kreait\Firebase\Exception\MessagingException;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AppController
 * Manages the rendering of templates for each given route.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", name="app_index")
     */
    public function loadIndexPage()
    {
        return $this->render('app/index.html.twig');
    }

    /**
     * @Route("/login", name="app_login", methods={"GET"})
     */
    public function loadFormsPage()
    {
        return $this->render('app/form.html.twig');
    }

    /**
     * @Route("/register", name="app_register", methods={"GET"})
     */
    public function loadRegisterPage()
    {
        return $this->render('app/form.html.twig');
    }

    /**
     * @Route("/platform", name="app_platform", methods={"GET"})
     */
    public function loadPlatformPage()
    {
        return $this->render('app/home.html.twig');
    }
    /**
     * @Route("/platform/home", name="app_home", methods={"GET"})
     */
    public function loadHomePage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/group-invitations/sent", name="app_group_invitations_sent", methods={"GET"})
     */
    public function loadSentGroupInvitationsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/group-invitations/pending", name="app_group_invitations_pending", methods={"GET"})
     */
    public function loadPendingGroupInvitationsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/user-invitations/sent", name="app_user_invitations_sent", methods={"GET"})
     */
    public function loadUserSentInvitationsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/user-invitations/pending", name="app_user_invitations_pending", methods={"GET"})
     */
    public function loadUserPendingInvitationsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/friends", name="app_friends", methods={"GET"})
     */
    public function loadFriendsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/groups", name="app_groups", methods={"GET"})
     */
    public function loadGroupsPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/change-pass", name="app_change_pass", methods={"GET"})
     */
    public function loadChangePassPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/group/{name}", name="app_group", methods={"GET"})
     */
    public function loadGroupPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/tasks/sent", name="app_tasks_sent", methods={"GET"})
     */
    public function loadSentTasksPage()
    {
        return $this->render('app/home.html.twig');
    }

    /**
     * @Route("/platform/tasks/pending", name="app_tasks_pending", methods={"GET"})
     */
    public function loadAskedTasksPage()
    {
        return $this->render('app/home.html.twig');
    }

}
