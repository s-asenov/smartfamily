/**
 * Custom validator.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */

import constraints from "./constraints";
import validate from "validate.js";

const validator = (field, value) => {
    let object = {};

    object[field] = value;

    let constraint = constraints[field];

    const result = validate(object, { [field]: constraint });

    if (result) {
        return result[field][0];
    }

    return null;
};


export default validator;