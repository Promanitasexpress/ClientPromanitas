import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_ID = "GET_USER_ID";
export const UPDATE_USER = "UPDATE_USER";

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const jsonData = await axios.get("/users");
      dispatch({
        type: GET_ALL_USERS,
        payload: jsonData.data.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getUserId(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/users/${id}`
      );
      dispatch({
        type: GET_USER_ID,
        payload: response.data.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function updateUser(id, data) {
  return async function (dispatch) {
    try {
      const update = await axios.put(
        `/users/${id}`,
        data
      );
      dispatch({
        type: UPDATE_USER,
        payload: update.data.data,
      });
    } catch (error) {
      alert("Ha ocurrido un error al modificar el usuario");
    }
  };
}

//No es prioridad por el momento
// export function deleteUser(id) {
//     return async function(){
//         try {
//             const deleted = await axios.delete(`https://promanitasapi.onrender.com/api/v1/users/${id}`)
//             alert(deleted.data.data.message)
//         } catch (error) {
//             alert("Este usuario no puede ser eliminado, contacta con los administradores del sitio para solucionarlo")
//         }
//     }
// }
