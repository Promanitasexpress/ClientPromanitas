import axios from "axios";

export const GET_SERVICE = "GET_SERVICE";

export function getName() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/services");

      const name = response.data.data
        .map((service) => service.name) // extraer la propiedad "name" de cada objeto en el arreglo "data"
        .filter((name, index, arr) => arr.indexOf(name) === index);

      dispatch({
        type: GET_SERVICE,
        payload: name, // enviar solo un arreglo de nombres
      });
    } catch (error) {
      error(error.message);
    }
  };
}
