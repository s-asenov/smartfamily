function contactReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'error': {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

export default contactReducer;