import { changeShownList, shownDataStartingIndex } from "../config/helper";

function shownDataReducer(state, action) {
  function shownDataFirstIndex() {
    return shownDataStartingIndex(state.page, state.itemsPerPage);
  }

  switch (action.type) {
    case "pageclick": {
      let { data } = action.payload;

      let selected = data.selected;
      let newIndex = selected * state.itemsPerPage;
      let newData = state.data.slice(newIndex, newIndex + state.itemsPerPage);

      return {
        ...state,
        shownData: newData,
        page: selected + 1,
      };
    }
    case "setshown": {
      let { result, isGroup } = action.payload; //todo json
      let group = {};

      if (typeof isGroup !== "undefined") {
        group = {
          isGroup: isGroup,
        };
      }

      return {
        ...state,
        data: result,
        shownData: result.slice(0, state.itemsPerPage),
        load: false,
        ...group,
      };
    }
    case "changeshown": {
      let { id } = action.payload;

      let newState = changeShownList(state, id);

      return {
        ...newState,
      };
    }
    case "newstate": {
      return {
        ...action.payload,
      };
    }
    case "additem": {
      let result = action.payload.result;

      return {
        ...state,
        data: [...state.data, result.json],
        shownData: [...state.data, result.json].slice(
          (page - 1) * 15,
          (page - 1) * 15 + 15
        ),
      };
    }
    case "sort": {
      switch (action.sort) {
        case "string": {
          if (state.sorts[action.sortingFieldName] !== "asc") {
            const newData = state.data;

            newData.sort((a, b) => {
              let firstName = a[action.sortingFieldName].toLowerCase();
              let secondName = b[action.sortingFieldName].toLowerCase();

              return firstName.localeCompare(secondName);
            });

            return {
              ...state,
              data: newData,
              shownData: newData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                [action.sortingFieldName]: "asc",
              },
            };
          } else {
            const newData = state.data;
            newData.sort((a, b) => {
              let firstName = a[action.sortingFieldName].toLowerCase();
              let secondName = b[action.sortingFieldName].toLowerCase();

              return firstName.localeCompare(secondName);
            });

            let reversedData = newData.reverse();

            return {
              ...state,
              data: reversedData,
              shownData: reversedData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                [action.sortingFieldName]: "desc",
              },
            };
          }
        }
        case "number": {
          if (state.sorts[action.sortingFieldName] !== "asc") {
            const newData = state.data;

            newData.sort((a, b) => {
              return a[action.sortingFieldName] - b[action.sortingFieldName];
            });

            return {
              ...state,
              data: newData,
              shownData: newData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                [action.sortingFieldName]: "asc",
              },
            };
          } else {
            const newData = state.data;
            newData.sort((a, b) => {
              return b[action.sortingFieldName] - a[action.sortingFieldName];
            });

            return {
              ...state,
              data: newData,
              shownData: newData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                [action.sortingFieldName]: "desc",
              },
            };
          }
        }
        case "date": {
          if (state.sorts.date !== "asc") {
            const newData = state.data;
            newData.sort((a, b) => {
              return (
                new Date(a[action.sortingFieldName]) -
                new Date(b[action.sortingFieldName])
              );
            });

            return {
              ...state,
              data: newData,
              shownData: newData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                date: "asc",
              },
            };
          } else {
            const newData = state.data;
            newData.sort((a, b) => {
              return (
                new Date(b[action.sortingFieldName]) -
                new Date(a[action.sortingFieldName])
              );
            });

            return {
              ...state,
              data: newData,
              shownData: newData.slice(
                shownDataFirstIndex(),
                shownDataFirstIndex() + state.itemsPerPage
              ),
              sorts: {
                ...state.sorts,
                date: "desc",
              },
            };
          }
        }
      }
    }
    default:
      return state;
  }
}

export default shownDataReducer;
