const initialState = {
    coordinates: [],
    zoom: 12,
    mapType: 'roadmap',
  };
  
  const mapReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COORDINATES':
        return {
          ...state,
          coordinates: action.payload,
        };
      case 'SET_ZOOM':
        return {
          ...state,
          zoom: action.payload,
        };
      case 'SET_MAP_TYPE':
        return {
          ...state,
          mapType: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default mapReducer;