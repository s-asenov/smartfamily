<?php

namespace App\Security;

use App\Entity\User;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

/**
 * Class TokenAuthenticator
 *
 * The authenticator responsible for the authentication of the user
 * on every api endpoint that requires him to be logged in.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class TokenAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $helper;
    private $session;
    private $entityManager;

    public function __construct(EntityManagerInterface $em, ApiHelper $helper, SessionInterface $session, EntityManagerInterface $entityManager)
    {
        $this->em = $em;
        $this->helper = $helper;
        $this->session = $session;
        $this->entityManager = $entityManager;
    }

    /*
      * Called when authentication is needed, but it's not sent
      */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = [
            'error' => "Нужна автентикация!"
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Called on every request to decide what credentials should be checked.
     *
     * Returning false will cause it to be skipped.
     *
     * @param Request $request
     * @return bool
     */
    public function supports(Request $request)
    {
        return $request->headers->has('Authorization') || $this->session->has('token');
    }

    /**
     * Gets the user credentials from the request and
     * returns them as array.
     *
     * @param Request $request
     * @return array|mixed
     */
    public function getCredentials(Request $request)
    {
        if ($request->headers->has("Authorization")) {
            $token = $request->headers->get("Authorization");
        } else if ($this->session->has('token')) {
            $token = $this->session->get('token');
        } else {
            $token = null;
        }

        return [
            'token' => $token
        ];
    }

    /**
     * Returns an UserInterface object based on the given credentials.
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     * @return User|UserInterface|null
     * @throws AuthenticationException when the provided credentials are invalid.
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $token = $credentials['token'];
        $user = $this->em->getRepository(User::class)->findByToken($token);

        if (!$token || !$user) {
            throw new AuthenticationException("Невалидни данни!");
        }
        
        if ($user && $user instanceof User) {
            $user->setIsActive(1)
            ->setLastSeen(new \DateTime());

            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }

        return $user;
    }

    /**
     * Checks if provided credentials are valid.
     *
     * If it returns false, the authentication will fail!
     * In case of an API token, no credential check is needed.
     *
     * @param mixed $credentials
     * @param UserInterface $user
     * @return bool
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    /**
     * Called when authentication fails.
     *
     * @param Request $request
     * @param AuthenticationException $exception
     * @return JsonResponse
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    /**
     * Called when authentication succeeds.
     *
     * Returns null, leting the request continue.
     *
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey
     * @return null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return null;
    }

    public function supportsRememberMe()
    {
        return false;
    }
}
