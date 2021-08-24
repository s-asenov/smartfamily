<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Serializer\Normalizer\MyNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Class ApiHelper
 *
 * This class contatins a set of helpful methods
 * used in the logic of the object managers.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class ApiHelper
{
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    /**
     * Uses custom main normalizer class
     * to normalize (convert) the given object or array of objects
     * as an array of data.
     *
     * @see MyNormalizer
     *
     * @param $objects
     * @return array
     */
    public function generalNormalizer($objects)
    {
        $normalizer = new MyNormalizer();

        if (!is_array($objects)) {
            return $normalizer->normalize($objects);
        }

        $normalizedObjects = [];

        foreach ($objects as $object) {
            $normalizedObject = $normalizer->normalize($object);
            array_push($normalizedObjects, $normalizedObject);
        }

        return $normalizedObjects;
    }

    /**
     * Used to normalize the user normalizer with the
     * provided object normalizer.
     *
     * @param $user
     * @return array|\ArrayObject|bool|float|int|mixed|string|null
     */
    public function currentUserNormalizer($user)
    {
        $normalizer = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $serializer = new Serializer($normalizer);

        try {
            $normalizedUser = $serializer->normalize($user);
        } catch (ExceptionInterface $e) {
            return "Unexpected error normalizing object";
        }

        return $normalizedUser;
    }

    /**
     * Method used before returning the successful json response.
     *
     * The method returns an array of the meta data,
     * which will be shown as a response
     * and the HTTP status of the response, which in this case will be always 200.
     *
     * @param $metaData
     * @return array
     */
    public function prepareForSuccessResponse($metaData)
    {
        return [
            'result' => $metaData,
            'status_code' => 200
        ];
    }

    /**
     * Method used before returning the error json response.
     *
     * This method returns an array of the error meta data,
     * which will be shown as a response
     * and the HTTP status of the response, which in this case will be always 400.
     *
     * @param $metaData
     * @return array
     */
    public function prepareForErrorResponse($metaData)
    {
        return [
            'result' => [
                'error' => $metaData
            ],
            'status_code' => 400
        ];
    }

    /**
     * Method validating the form data of a request.
     *
     * The method loops through the array of expected form data fields
     * and checks whether or not they are provided in the request.
     * If the provided values are not the same ammount as the expected ones,
     * the method returns false.
     *
     * @param array $expectedValues
     * @param Request $request
     * @return bool
     */
    public function validateRequest(array $expectedValues, Request $request)
    {
        $providedValues = 0;

        foreach ($expectedValues as $value) {
            if ($request->request->has($value)) {
                $providedValues++;
            }
        }
        if ($providedValues == count($expectedValues)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * The method generates random string, using the random_int().
     *
     * @param int $length
     * @return string
     * @throws \Exception when the length is not possible number
     */
    public function generateRandomStrings($length = 100)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = mb_strlen($characters, '8bit') - 1;

        for ($i = 0; $i < $length; ++$i) {
            $pieces []= $characters[random_int(0, $max)];
        }

        return implode('', $pieces);
    }

    /**
     * Used for validating object constraints, if there are any.
     * If there are validation errors, the method will return an array of error messages.
     * Otherwise the method will return null.
     *
     * @param $object
     * @param null $constraints
     * @param null $groups
     * @return array|null
     */
    public function validate($object, $constraints = null, $groups = null)
    {
        $errors = $this->validator->validate($object, $constraints, $groups);

        if (0 < count($errors)) {
            $messages = [];

            foreach ($errors as $violation) {
                $messages[$violation->getPropertyPath()] = $violation->getMessage();
            }

            return $this->prepareForErrorResponse($messages);
        }

        return null;
    }
}