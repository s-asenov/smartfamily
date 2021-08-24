<?php

namespace App\Security;

use App\Entity\User;
use App\Service\ApiHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;


/**
 * Class LoginAuthenticator
 *
 * The authenticator responsible for the processing of the login request.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class LoginAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $apiHelper;
    private $passwordEncoder;
    private $session;

    public function __construct(EntityManagerInterface $em, ApiHelper $apiHelper, UserPasswordEncoderInterface $passwordEncoder, SessionInterface $session)
    {
        $this->em = $em;
        $this->apiHelper = $apiHelper;
        $this->passwordEncoder = $passwordEncoder;
        $this->session = $session;
    }

    /**
     * Is the request supported by the authenticator?
     *
     * If it returns false, the whole class will be skipped.
     *
     * Returning false will cause it to be skipped.
     *
     * @param Request $request
     * @return bool
     */
    public function supports(Request $request)
    {
        return !$request->headers->has("Authorization") || !$this->session->has('token');
    }

    /**
     * Gets the user credentials from the login form and
     * returns them as array.
     *
     * @param Request $request
     * @return array|mixed
     */
    public function getCredentials(Request $request)
    {
        return [
            'email' => $request->request->get('email'),
            'password' => $request->request->get('password'),
        ];
    }

    /**
     * Called when the request has provided auth token.
     *
     * @param Request $request
     * @param AuthenticationException|null $authException
     * @return JsonResponse
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        if ($request->headers->has("Authorization")) {
            return new JsonResponse([
                'error' => 'Потребителят вече е влязъл!'],
                403);
        } else {
            return new JsonResponse([
                'error' => 'Неуспешен вход!'
            ], 403);
        }
    }

    /**
     * Returns an UserInterface object based on the given credentials.
     *
     * @param mixed $credentials
     * @param UserProviderInterface $userProvider
     * @return User|UserInterface|null
     * @throws BadCredentialsException when the provided credentials are invalid.
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $email = $credentials['email'];

        $query = $this->em->getRepository(User::class)->findByEmail($email);

        if (!$email || !$query) {
            throw new BadCredentialsException("Невалидни данни!");
        }

        return $query;
    }

    /**
     * Checks if provided credentials are valid.
     *
     * If it returns false, the authentication will fail!
     *
     * @param mixed $credentials
     * @param UserInterface $user
     * @return bool
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return $this->passwordEncoder->isPasswordValid($user, $credentials['password']);
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
        return new JsonResponse([
            'error' => "Невалидни данни!"
        ], 400);
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
