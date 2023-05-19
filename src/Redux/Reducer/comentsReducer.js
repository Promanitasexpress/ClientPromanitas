const initialState = {
    coments: []
  };
  

  const comentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_COMENT':
        return {
          ...state,
          coments: [...state.coments, action.coment]
        };
      default:
        return state;
    }
  };
  
  export default comentsReducer;