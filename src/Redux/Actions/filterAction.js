// import axios from 'axios';

export const filterAction = (payload) => { 
    try{
    return {
        type: "FILTER_ADPOST", 
        payload 
    }
}catch (error){
    console.error("Error in filter", error)
}
}