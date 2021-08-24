function modalReducer(state, action) {
  let modals = {};

  // if (Array.isArray(action.modal)) {
  //   action.modal.forEach((el) => {
  //     modals[el] = !state[el];
  //   });
  // } else {
  //   modals[action.modal] = !state[action.modal];
  // }

  return {
    ...state,
    [action.modal]: !state[action.modal],
  };
}

export default modalReducer;
