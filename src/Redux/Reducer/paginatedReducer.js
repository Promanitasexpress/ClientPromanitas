const initialState = {
  allPro: [],
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRO":
      return {
        ...state,
        allPro: action.payload,
      };
    default:
      return state;
  }
}

export default homeReducer;
