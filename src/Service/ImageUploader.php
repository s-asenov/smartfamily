<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Finder\Finder;

/**
 * Class ImageUploader
 *
 * This class is responsible for the uploading of the
 * user and group images.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class ImageUploader
{
    private $targetDirectory;

    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }

    public function upload(UploadedFile $file)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
        $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $file->move($this->getTargetDirectory(), $fileName);
        } catch (FileException $e) {
            throw $e;
        }

        return $fileName;
    }

    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }

    /**
     * Loops through all images in the uploads directory
     * until it finds the image with the provided image name.
     * If it returns null, the image was not found.
     *
     * @param $imageName
     * @return mixed|\Symfony\Component\Finder\SplFileInfo|null
     */
    public function showImage($imageName)
    {
        $finder = new Finder();

        $finder->files()->in($this->getTargetDirectory());

        foreach ($finder as $file) {
            $fileName = $file->getFilename();

            if ($fileName == $imageName) {
                return $file;
            }
        }

        return null;
    }
}