function markerReducer(state, action) {
  switch (action.type) {
    case "add": {
      let { label, lat, lng } = action.marker;

      return {
        ...state,
        [label]: {
          lat: lat,
          lng: lng,
        },
      };
    }
    case "remove": {
      let { label } = action.marker;

      delete state[label];
      return {
        ...state,
      };
    }
    case "clear": {
      return {};
    }
  }
}

export default markerReducer;
