<?php


namespace App\Service\Manager;


use App\Entity\Group;
use App\Entity\GroupMembership;
use App\Entity\Task;
use App\Entity\User;
use App\Service\ApiHelper;
use App\Service\ImageUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class GroupManager
 *
 * This class is responsible for the logic behind the Group objects.
 *
 * @see Group
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class GroupManager extends ObjectManager
{
    private $membershipManager;
    private $uploader;

    public function __construct(EntityManagerInterface $entityManager, ApiHelper $helper, GroupMembershipManager $groupMembershipManager, ImageUploader $uploader)
    {
        parent::__construct($entityManager, $helper);
        $this->membershipManager = $groupMembershipManager;
        $this->uploader = $uploader;
    }

    /**
     * Method creating the group.
     *
     * This method takes the authenticated user and the request
     * and handles the logic.
     *
     * @param User $user
     * @param Request $request
     * @return array
     */
    public function createGroup(Request $request, User $user)
    {
        /**
         * If the request has not provided the required form data,
         * return an array of the error response.
         *
         * @see ApiHelper::validateRequest()
         */
        if (!$this->helper->validateRequest(['group_name', 'group_description'], $request)) {
            return $this->helper->prepareForErrorResponse(self::MISSING_DATA);
        }

        $data['group_name'] = $request->request->get("group_name");
        $data['group_description'] = $request->request->get("group_description");
        $data['group_img'] = $request->files->get("group_img");

        /**
         * If there is no image passed in the request, set the image path to empty string.
         * If there is, upload the image in the uploads directrory and set the image path to the
         * corresponding one created from the uploader service.
         *
         * @see ImageUploader::upload()
         */
        if (!$data['group_img']) {
            $groupImgFile = "";
        } else {
            $groupImgFile = $this->uploader->upload($data['group_img']);
        }

        // Create the new Group object with the passed data from the request.
        $group = new Group();

        $group->setGroupName($data['group_name'])
            ->setGroupDescription($data['group_description'])
            ->setGroupImg($groupImgFile);

        /**
         * Validate the newly created Group object with validator service
         * and if there are errors return them.
         */
        $errors = $this->helper->validate($group);

        if ($errors) {
            return $errors;
        }

        $this->entityManager->persist($group);
        $this->entityManager->flush();

        // Add a group membership with *admin* permissions.
        $this->membershipManager->addMembership($user, $group, 1);

        $normalizedGroup = $this->helper->generalNormalizer($group);
        return $this->helper->prepareForSuccessResponse($normalizedGroup);
    }

    /**
     * Method updating the info of a group.
     *
     * This method takes the request, the group object and the authenticated user
     * and updates the group with the given data.
     *
     * @param Request $request
     * @param Group $group
     * @param User $user
     * @return array
     */
    public function updateGroupInfo(Request $request, Group $group, User $user)
    {
        /**
         * Check if the user has *admin* permission|right.
         * If he does not have it, return an array of the error response.
         *
         * @see GroupMembershipManager::userHasPermission()
         */
        if (!$this->membershipManager->userHasPermission($user, $group)) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        /**
         * Check what data was passed in the request and
         * set the group property to the corresponding one.
         */
        if ($request->request->has("group_name")) {
            $groupName = $request->request->get("group_name");
            $group->setGroupName($groupName);
        }

        if ($request->request->has("group_description")) {
            $description = $request->request->get("group_description");
            $group->setGroupDescription($description);
        }

        if ($request->files->has("group_img")) {
            $data['group_img'] = $request->files->get("group_img");

            /**
             * If there is no image passed in the request, set the image path to empty string.
             * If there is, upload the image in the uploads directrory and set the image path to the
             * corresponding one created from the uploader service.
             *
             * @see ImageUploader::upload()
             */
            if (!$data['group_img']) {
                $groupImgFile = "";
            } else {
                $groupImgFile = $this->uploader->upload($data['group_img']);
            }
            $group->setGroupImg($groupImgFile);
        }

        /**
         * Validate the newly created Group object with validator service
         * and if there are errors return them.
        */
        $errors = $this->helper->validate($group);

        if ($errors) {
            return $errors;
        }

        $this->entityManager->persist($group);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            'status' => self::META_SUCCESS,
            'group' => $this->helper->generalNormalizer($group)
        ]);
    }

    /**
     * Method deleting a group.
     *
     * This method takes the group object, which wants to be deleted,
     * and the authenticated user
     * and handles the logic.
     *
     * @param Group $group
     * @param User $user
     * @return array
     */
    public function deleteGroup(Group $group, User $user)
    {
        /**
         * Check if the user has *admin* permission|right.
         * If he does not have it, return an array of the error response.
         *
         * @see GroupMembershipManager::userHasPermission()
         */
        if (!$this->membershipManager->userHasPermission($user, $group)) {
            return $this->helper->prepareForErrorResponse(self::NO_PERMISSION);
        }

        // Delete all memberships to the group and delete the group itself.
        $this->entityManager->getRepository(GroupMembership::class)->deleteAllMemberships($group->getId());
        $this->entityManager->getRepository(Task::class)->deleteAllTasks($group->getId());
        
        $this->entityManager->remove($group);
        $this->entityManager->flush();

        return $this->helper->prepareForSuccessResponse([
            'status' => "success",
            'group' => self::META_DELETED
        ]);
    }

    /**
     * Method taking the group object and returning an array of it.
     *
     * @param Group $group
     * @return array
     */
    public function showGroup(Group $group)
    {
        $normalizedGroup = $this->helper->generalNormalizer($group);

        return $this->helper->prepareForSuccessResponse($normalizedGroup);
    }
}