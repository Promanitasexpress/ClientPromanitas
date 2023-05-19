import axios from "axios"

export function getServices(){
    return async function(dispatch){
        try {
         const responseService= await axios.get(`/services/`);
        return dispatch({
            type:"ALL_SERVICE",
            payload: responseService.data.data
        })
        } catch (error) {
        console.log(error)            
        }
    }
}

export function getPosts (){
    return async function(dispatch){
        try {
            const responsePosts = await axios.get(`/adposts`);
            return dispatch({
                type:"ALL_POSTS",
                payload:responsePosts.data.data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}