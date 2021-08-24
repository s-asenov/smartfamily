import validator from "../config/validator";

function formReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
        errors: {
          ...state.errors,
          error: null,
          [action.fieldName]: validator(action.fieldName, action.payload),
        },
      };
    }
    case "image": {
      return {
        ...state,
        [action.fieldName]: action.payload,
        [`${action.fieldName}Name`]: action.payload.name,
      };
    }
    case "validate": {
      var errors = state.errors;

      for (let propertyName of Object.keys(action.payload)) {
        if (propertyName.includes("Conf")) {
          let original = propertyName.slice(0, -4);

          errors[propertyName] =
            action.payload[propertyName] !== action.payload[original]
              ? " не съвпадат!"
              : null;
        } else {
          // errors[propertyName] = errors[propertyName] ?? validator(action.payload.constraint, action.payload[propertyName]) -> in case of using other constraint constraints
          errors[propertyName] =
            errors[propertyName] ??
            validator(propertyName, action.payload[propertyName]);
        }
      }

      return {
        ...state,
        errors: {
          ...errors,
        },
      };
    }
    case "error": {
      var errors = state.errors;

      if (typeof action.payload !== "object") {
        errors["error"] = action.payload;
      } else {
        for (let propertyName of Object.keys(action.payload)) {
          errors[propertyName] = action.payload[propertyName];
        }
      }

      return {
        ...state,
        errors: {
          ...errors,
        },
      };
    }
    case "clean": {
      let fields = {};

      for (let propertyName of Object.keys(action.payload)) {
        fields[propertyName] = "";
      }

      return {
        ...state,
        ...fields,
      };
    }
    default:
      return state;
  }
}

export default formReducer;
