import { searchUser } from "../config/api";

function searchReducer(state, action) {
  switch (action.type) {
    case "input": {
      let { value } = action.payload;

      return {
        ...state,
        input: value,
        doneRequest: false,
      };
    }
    case "result": {
      let { result } = action.payload;

      return {
        ...state,
        userResult: result,
        userResultShow: true,
        doneRequest: true,
      };
    }
    case "setinvited": {
      let user = action.payload.user;

      return {
        ...state,
        input: "",
        invitedUserData: user.firstName + " " + user.lastName,
        userResultShow: false,
        invitedUser: user.id,
      };
    }
    case "setischild": {
      let isChild = action.payload.isChild;

      return {
        ...state,
        invitedUserIsChild: isChild,
      };
    }
    default:
      return state;
  }
}

export default searchReducer;
