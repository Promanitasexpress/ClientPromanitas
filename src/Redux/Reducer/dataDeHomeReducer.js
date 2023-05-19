
const initialState = {
    services: [],
    adPosts: [],
  }
  
  function dataHomeReducer(state = initialState, action) {
    console.log("por aca llega Adposts:",action)

    switch (action.type) {
      case "NEW_PAGE":
        return {
          ...state,
          services: action.payload.services,
          adPosts: action.payload.posts,
        }
        case "SEARCH":
            const filteredPosts = state.adPosts.map(adPost => adPost.serviceId === action.payload);
            return {
              ...state,
              adPosts: filteredPosts
            }
      default:
        return state
    }
  }
  
  export default dataHomeReducer;
  