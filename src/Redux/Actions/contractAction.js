import axios from 'axios';

export const GET_ALL_CONTRACTS = "GET_ALL_CONTRACTS";

//  enviar el contrato al back
export const sendContract = (payment, username, detail, email) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("https://promanitasapi.onrender.com/api/v1/contract/", {
        payment,
        username,
        detail,
        email
      });
      const contractId = response.data.data.id;
      dispatch(setContractId(contractId));
    } catch (error) {
     throw new Error(error);
    }
  };
};

export const setContractId = (id) => {
  return async (dispatch) => {
    try{
      await axios.get(`https://promanitasapi.onrender.com/api/v1/contract/${id}`)
      dispatch({type: "SET_CONTRACT_ID", payload:id})
    }catch(error){
      throw new Error(error)
    }
      
    }}

  export const getAllContracts = () => async (dispatch) => {
    try {
      const response = await axios.get("https://promanitasapi.onrender.com/api/v1/contract/");
      dispatch({type: GET_ALL_CONTRACTS, payload: response.data.data});
    } catch (error) {
      console.log(error);
    
    }
  }