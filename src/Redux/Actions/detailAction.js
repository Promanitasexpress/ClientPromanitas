import axios from "axios";

export const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";
export const FETCH_DETAIL_SUCCESS = "FETCH_DETAIL_SUCCESS";
export const FETCH_DETAIL_FAILURE = "FETCH_DETAIL_FAILURE";

export const fetchDetailRequest = () => {
  return {
    type: FETCH_DETAIL_REQUEST,
  };
};

export const fetchDetailSuccess = (data) => {
  return {
    type: FETCH_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchDetailFailure = (error) => {
  return {
    type: FETCH_DETAIL_FAILURE,
    payload: error,
  };
};

export const getDetail = (postId) => {
  return async (dispatch) => {
    dispatch(fetchDetailRequest());
    try {
      const response = await axios.get(`/adposts/${postId}`);
      const detailData = {
        description: response.data.data.description,
        image: response.data.data.image,
        UserId: response.data.data.UserId,
        ServiceId: response.data.data.ServiceId,
      };
      dispatch(fetchDetailSuccess(detailData));
    } catch (error) {
      dispatch(fetchDetailFailure(error.message));
    }
  };
};

export const getServiceDetail = (serviceId) => {
  return async (dispatch) => {
    dispatch(fetchDetailRequest());
    try {
      const response = await axios.get(`/services/${serviceId}`);
      const detailData = {
        name: response.data.data.name,
        image: response.data.data.image,
      };
      dispatch(fetchServiceDetailSuccess(detailData));
    } catch (error) {
      dispatch(fetchDetailFailure(error.message));
    }
  };
};

export const FETCH_SERVICE_DETAIL_REQUEST = "FETCH_SERVICE_DETAIL_REQUEST";
export const FETCH_SERVICE_DETAIL_SUCCESS = "FETCH_SERVICE_DETAIL_SUCCESS";
export const FETCH_SERVICE_DETAIL_FAILURE = "FETCH_SERVICE_DETAIL_FAILURE";

export const fetchServiceDetailRequest = () => {
  return {
    type: FETCH_SERVICE_DETAIL_REQUEST,
  };
};

export const fetchServiceDetailSuccess = (data) => {
  return {
    type: FETCH_SERVICE_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchServiceDetailFailure = (error) => {
  return {
    type: FETCH_SERVICE_DETAIL_FAILURE,
    payload: error,
  };
};

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await axios.get(`/users/${userId}`);
      const userData = {
        image: response.data.data.image,
      };
      dispatch(fetchUserSuccess(userData));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};

export const FETCH_POST_DETAIL_REQUEST = "FETCH_POST_DETAIL_REQUEST";
export const FETCH_POST_DETAIL_SUCCESS = "FETCH_POST_DETAIL_SUCCESS";
export const FETCH_POST_DETAIL_FAILURE = "FETCH_POST_DETAIL_FAILURE";

export const fetchPostDetailRequest = () => {
  return {
    type: FETCH_SERVICE_DETAIL_REQUEST,
  };
};

export const fetchPostDetailSuccess = (data) => {
  return {
    type: FETCH_POST_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchPostDetailFailure = (error) => {
  return {
    type: FETCH_SERVICE_DETAIL_FAILURE,
    payload: error,
  };
};

export const getPostDetail = (id) => {
  console.log("me estan ejecutano");
  return async (dispatch) => {
    dispatch(fetchPostDetailRequest());
    try {
      const postDetail = await getPost(id);
      const userId = postDetail.UserId;
      const serviceId = postDetail.ServiceId;
      const userDetail = await getUserDetail(userId);
      const service = await getService(serviceId);
      const dataUser = {
        firstname: userDetail.firstname,
        lastname: userDetail.lastname,
        image: userDetail.image,
        UserId: userId,
      };
      const dataPost = {
        description: postDetail.description,
        image: postDetail.image,
        service: service,
      };
      const data = {
        dataPost: dataPost,
        dataUser: dataUser,
      };
      dispatch(fetchPostDetailSuccess(data));
    } catch (error) {
      console.log("error");
      dispatch(fetchPostDetailFailure(error.message));
    }
  };
};

const getPost = async (id) => {
  try {
    const jsonPost = await axios.get(`/adposts/${id}`);
    return jsonPost.data.data;
  } catch (error) {
    throw error;
  }
};

const getUserDetail = async (id) => {
  try {
    const jsonUser = await axios.get(`/users/${id}`);
    return jsonUser.data.data;
  } catch (error) {
    throw error;
  }
};

const getService = async (id) => {
  try {
    const jsonService = await axios.get(`/services/${id}`);
    return jsonService.data.data.name;
  } catch (error) {
    throw error;
  }
};
