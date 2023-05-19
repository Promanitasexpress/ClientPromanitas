const initialState = {
    rating: 0,
    error: null,
  };
  
  export const sendRatingSuccess = (rating) => {
    return {
      type: "SEND_RATING_SUCCESS",
      payload: { rating },
    };
  };
  
  
  export const sendRatingError = (error) => {
    return {
      type: "SEND_RATING_ERROR",
      payload: { error },
    };
  };
  
  
  const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEND_RATING_SUCCESS":
        return {
          ...state,
         rating: action.payload.rating,
          error: null,
        };
      case "SEND_RATING_ERROR":
        return {
          ...state,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default ratingReducer;