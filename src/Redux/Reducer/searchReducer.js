const initialState = {
  search: [],
  services: [],
};

function searchReducer(state = initialState, action) {
  // console.log("Data desde el reducer", action.payload);
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "GET_SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "CLEAN_SEARCH":
      return {
        ...state,
        search: [],
      };
    default:
      return { ...state };
  }
}

export default searchReducer;
