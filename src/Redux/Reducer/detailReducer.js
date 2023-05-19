import {
  FETCH_DETAIL_REQUEST,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_FAILURE,
  FETCH_SERVICE_DETAIL_REQUEST,
  FETCH_SERVICE_DETAIL_SUCCESS,
  FETCH_SERVICE_DETAIL_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_POST_DETAIL_REQUEST,
  FETCH_POST_DETAIL_SUCCESS,
  FETCH_POST_DETAIL_FAILURE,
} from "../Actions/detailAction";

const initialState = {
  adpost: {},
  detailPost: {},
  user: {},
  service: {},
  loading: false,
  error: "",
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_REQUEST:
    case FETCH_SERVICE_DETAIL_REQUEST:
    case FETCH_USER_REQUEST:
    case FETCH_POST_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        adpost: action.payload,
        error: "",
      };
    case FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detailPost: action.payload,
        error: "",
      };
    case FETCH_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        service: action.payload,
        error: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_DETAIL_FAILURE:
    case FETCH_SERVICE_DETAIL_FAILURE:
    case FETCH_USER_FAILURE:
    case FETCH_POST_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        adpost: {},
        service: {},
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailReducer;
