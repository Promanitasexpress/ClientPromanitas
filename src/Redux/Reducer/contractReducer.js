// reducers/contractReducer.js
import {GET_ALL_CONTRACTS} from "../Actions/contractAction"

const initialState = {
  contracts: [],
  contractId: null,
};


const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTRACT_ID':
      return {
        ...state,
        contractId: action.payload
      };
    
    case GET_ALL_CONTRACTS:
      return{
        ...state,
        contracts: action.payload
      }

    default:
      return state;
  }
};



export default contractReducer;
