import axios from "axios";
// import user from "../arreglo.jsx"

export function getPaginated(pageNumber, pageSize) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `/adposts?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      const data = json.data;
      return dispatch({
        type: "GET_PRO",
        payload: data,
      });
    } catch (error) {
      console.error("Error in getPaginated", error);
    }
  };
}
