<?php


namespace App\Type;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

/**
 * Class TinyInt
 *
 * This Doctrine type class is used to replicate the tinyint type
 * in the MySQL table.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class TinyInt extends Type
{
    const TINYINT = 'tinyint';

    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform)
    {
        $fieldDeclaration = array_merge([
            'length' => 1,
        ], $fieldDeclaration);

        return sprintf("TINYINT(%d)",
            $fieldDeclaration['length']
        );
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return (int) $value;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        return (int) $value;
    }

    public function getName()
    {
        return self::TINYINT;
    }

//    public function getBindingType()
//    {
//        return \PDO::PARAM_INT;
//    }
}