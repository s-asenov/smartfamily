function accountInfoReducer(state, action) {
  switch (action.type) {
    case "chartdata": {
      return {
        ...state,
        length: action.length,
        doneRequest: true,
      };
    }
    case "image": {
      return {
        ...state,
        [action.fieldName]: action.payload,
        [`${action.fieldName}Name`]: action.payload.name,
      };
    }
    case "clearimage": {
      return {
        ...state,
        [action.fieldName]: null,
        [`${action.fieldName}Name`]: "",
      };
    }
    default:
      return state;
  }
}

export default accountInfoReducer;
