const initialState = {
    services: [],
    adposts: [],
    users:[],
    isLoading: false,
  };
  
  function avisos(state = initialState, action) {
    switch (action.type) {
      case "LOADING":
        return {
          ...state,
          isLoading: true,
        };
      case "ALL_SERVICE":
        return {
          ...state,
          services: action.payload,
          isLoading: false,
        };
        case "ALL_USERS":
          return{
              ...state,
              users:action.payload
          }
      case "ALL_POSTS":
        return {
          ...state,
          adposts: action.payload,
          isLoading: false,
        };
      case "DELETE_POSTS":
        const deletedPostId = action.payload;
        const newAdposts = state.adposts.filter(
          (post) => post.id !== deletedPostId
        );
        return {
          ...state,
          adposts: newAdposts,
          isLoading: false,
        };
      case "PUT_POSTS":
        return {
          ...state,
          adposts: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  }
  
  export default avisos;