import { GET_SERVICE } from "../Actions/newPostActions";

const initialState = {
     names:[],
 
  };
  
   export const newPostReducer = (state = initialState, action) => {
    switch (action.type) {
      
            case GET_SERVICE: 
               return {
               ...state,
                names: action.payload,
      };
      default:
        return state;
    }
  };