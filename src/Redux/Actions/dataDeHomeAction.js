import axios from 'axios'

export function dataHome() {
  return async function(dispatch) {
    try {
      const servicesResponse = await axios.get(`/services/`);
      const adPostsResponse = await axios.get(`/adposts/`);
      
      const adPosts = adPostsResponse.data.data && adPostsResponse.data.data.map(adPost => ({
        name: adPost.name,
        description: adPost.description,
        image: adPost.image,
        serviceId: adPost.ServiceId
      }));

      const services = servicesResponse.data.data && servicesResponse.data.data.map(service => ({
        id: service.id,
        name: service.name,
        image: service.image
      }));

      const filteredAdPosts = adPosts.filter(adPost => services.filter(service => service.id === adPost.serviceId).length > 0);


      console.log("filtros por posts:", filteredAdPosts);

      return dispatch({
        type: "NEW_PAGE",
        payload: {
          services: services,
          posts: filteredAdPosts
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function search(serviceId) {
  return {
    type: "SEARCH",
    payload: serviceId
  }
}
