import {GET_ALL_USERS, GET_USER_ID, UPDATE_USER} from "../Actions/userAction"

const initialState = {
    allUsers:[],
    userId:{},
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_USERS:
           
            return{
                ...state,
                allUsers: action.payload,
            }
        case GET_USER_ID:
            return{
                ...state,
                allUsers: action.payload,
                userId: action.payload,
            }
        case UPDATE_USER:
            return{
                ...state,
                userId:action.payload,
            }
        default:
            return {...state}
    }
}

export default userReducer;