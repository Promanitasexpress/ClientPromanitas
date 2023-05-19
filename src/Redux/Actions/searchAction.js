import axios from "axios";

async function getPro() {
  try {
    const url = "/adposts";
    const json = await axios(url);
    const data = json.data.data;
    // const allJson = json.data.data
    // console.log("por aca llega esto:", json.data.data)
    return data;
  } catch (error) {
    console.error("Error in getPro", error);
  }
}

export function filterPosts(pointer) {
  return async function (dispatch) {
    try {
      const json = await getPro();
      console.log(json);
      const data = json.filter((element) => element.ServiceId === pointer);
      return dispatch({
        type: "FILTER",
        payload: data,
      });
    } catch (error) {
      console.error("Error in filterPosts", error);
    }
  };
}

// export function searchAction(name) {
//   return async function (dispatch) {
//     try {
//       const json = await axios(`/adposts?name=${name}`);
//       const data = json.data.data;
//       return dispatch({
//         type: "SEARCH",
//         payload: data,
//       });
//     } catch (error) {
//       console.error("Error in search", error);
//     }
//   };
// }

export function searchAction(name, pointer) {
  return async function (dispatch) {
    try {
      const json = await getPro();
      let dataSearch = [];
      let dataFilter = [];
      let data = [];
      switch (true) {
        case !!name && !!pointer:
          dataSearch = await axios(`/adposts?name=${name}`);
          dataSearch = dataSearch.data.data;
          dataFilter = json.filter((element) => element.ServiceId === pointer);
          data = dataSearch.filter((item1) =>
            dataFilter.some((item2) => item2.ServiceId === item1.ServiceId)
          );
          return dispatch({
            type: "SEARCH",
            payload: data,
          });
        case !!name:
          dataSearch = await axios(`/adposts?name=${name}`);
          data = dataSearch.data.data;
          return dispatch({
            type: "SEARCH",
            payload: data,
          });
        case !!pointer:
          dataFilter = json.filter((element) => element.ServiceId === pointer);
          data = dataFilter;
          return dispatch({
            type: "SEARCH",
            payload: data,
          });
        default:
          return "No paso nada";
      }
    } catch (error) {
      console.error("Error in search", error);
    }
  };
}

export function getServices() {
  return async function (dispatch) {
    try {
      const json = await axios
        .get("/services")
        .then((response) => response.data);
      const data = json.data;
      return dispatch({
        type: "GET_SERVICES",
        payload: data,
      });
    } catch (error) {
      console.error("Error in getServices", error);
    }
  };
}

export function cleanSearch() {
  return {
    type: "CLEAN_SEARCH",
  };
}

// if (name && pointer) {
// dataSearch = await axios(`/adposts?name=${name}`);
// dataSearch = dataSearch.data.data;
// dataFilter = json.filter((element) => element.ServiceId === pointer);
// var data = dataSearch.filter((item1) =>
//   dataFilter.some((item2) => item2.ServiceId === item1.ServiceId)
// );
// console.log("Data combinada", data);
// console.log("Tengo las dos cosas");
//   return;
// } else {
//   if (name) {
// console.log("Tengo nombre");
// dataSearch = await axios(`/adposts?name=${name}`);
// var data = dataSearch.data.data;
//   } else {
//     if (pointer) {
// console.log("Tengo para el filter");
// dataFilter = json.filter(
//   (element) => element.ServiceId === pointer
// );
// var data = dataFilter;
//     }
//   }
// }
