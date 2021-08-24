import validator from "../config/validator";
import { BASE_URL } from "../config/helper";
import noGroupImg from "app/assets/images/question-mark.png";

function groupPageReducer(state, action) {
  switch (action.type) {
    case "setgroup": {
      let { result } = action.payload; //json
      let groupImg;

      if (result.groupImg === "") {
        groupImg = noGroupImg;
      } else {
        groupImg = `${BASE_URL}uploads/${result.groupImg}`;
      }

      return {
        ...state,
        groupId: result.id,
        groupInfo: {
          groupName: result.groupName,
          groupDescription: result.groupDescription,
          groupImg: groupImg,
        },
        updateInfo: {
          groupName: result.groupName,
          groupDescription: result.groupDescription,
          groupImg: groupImg,
        },
      };
    }
    case "updategroup": {
      let { groupImg } = action.payload;

      return {
        ...state,
        groupImgName: "",
        groupInfo: {
          groupName: state.updateInfo.groupName,
          groupDescription: state.updateInfo.groupDescription,
          groupImg: groupImg,
        },
      };
    }
    case "setusermembership": {
      let { result } = action.payload; //json

      return {
        ...state,
        userMembership: result,
      };
    }
    case "loadmembers": {
      let { result } = action.payload;

      return {
        ...state,
        groupMemberships: result,
        load: false,
      };
    }
    case "loadfriends": {
      let { result } = action.payload;

      return {
        ...state,
        friendsOptions: result,
      };
    }
    case "updateinput": {
      let payload = action.payload;
      let fieldName = action.fieldName;

      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          [fieldName]: payload,
        },
        errors: {
          ...state.errors,
          update: {
            ...state.errors.update,
            [fieldName]: validator(fieldName, payload),
          },
        },
      };
    }
    case "image": {
      return {
        ...state,
        updateInfo: {
          ...state.updateInfo,
          [action.fieldName]: action.payload,
        },
        [`${action.fieldName}Name`]: action.payload.name,
      };
    }
    case "taskinput": {
      let payload = action.payload;
      let fieldName = action.fieldName;

      return {
        ...state,
        taskInfo: {
          ...state.taskInfo,
          [fieldName]: payload,
        },
        errors: {
          ...state.errors,
          task: {
            ...state.errors.task,
            [fieldName]: validator(fieldName, payload),
          },
        },
      };
    }
    case "setexpiring": {
      return {
        ...state,
        taskInfo: {
          ...state.taskInfo,
          expiringOn: action.date,
        },
        errors: {
          ...state.errors,
          task: {
            ...state.errors.task,
            expiringOn: null,
          },
        },
      };
    }
    case "invite": {
      let { value } = action.payload;

      let values = value.split("|");

      return {
        ...state,
        invitedUser: values[0],
        invitedUserData: values[1] + " " + values[2],
        userResultShow: false,
      };
    }
    case "appoint": {
      let appointee = action.appointee;

      return {
        ...state,
        taskInfo: {
          ...state.taskInfo,
          appointeeId: appointee,
        },
        errors: {
          ...state.errors,
          task: {
            ...state.errors.task,
            appointeeId: null,
          },
        },
      };
    }
    case "changememberlist": {
      const newState = state;
      const { newEl } = action.payload;

      const dataIndex = newState.groupMemberships.findIndex(
        (mem) => mem.id === newEl.id
      );

      if (dataIndex === -1) return;
      newState.groupMemberships[dataIndex] = newEl;

      return {
        ...newState,
      };
    }
    case "deletemember": {
      const newState = state;
      let { id } = action.payload;

      const dataIndex = newState.groupMemberships.findIndex(
        (mem) => mem.id === id
      );

      if (dataIndex === -1) return;

      newState.groupMemberships.splice(dataIndex, 1);

      return {
        ...newState,
      };
    }
    case "validatetask": {
      var errors = state.errors.task;

      for (let propertyName of Object.keys(action.payload)) {
        errors[propertyName] = validator(
          propertyName,
          action.payload[propertyName]
        );
      }

      return {
        ...state,
        errors: {
          ...state.errors,
          task: {
            ...errors,
          },
        },
      };
    }
    case "validateupdate": {
      var errors = state.errors.update;

      for (let propertyName of Object.keys(action.payload)) {
        errors[propertyName] =
          errors[propertyName] ??
          validator(propertyName, action.payload[propertyName]);
      }

      return {
        ...state,
        errors: {
          ...state.errors,
          update: {
            ...errors,
          },
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
          errors,
        },
      };
    }
  }
}

export default groupPageReducer;
