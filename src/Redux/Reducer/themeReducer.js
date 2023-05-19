const initialState = {
  themeSelected: "light",
};

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_THEME":
      if (state.themeSelected === "light") {
        return {
          ...state,
          themeSelected: "dark",
        };
      } else {
        return {
          ...state,
          themeSelected: "light",
        };
      }
    default:
      return state;
  }
}

export default themeReducer;
