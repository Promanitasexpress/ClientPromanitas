import React from "react";
import ContractPDF from "../ContractForm/ContractPDF";
import { useNavigate } from "react-router-dom";


const PaymentHistory = ({ contractData }) => {
  const { contractId } = contractData;
  const navigate=useNavigate()
  const handlePayment = (contractId) => {
    navigate("/payment");
  }; 
  return (
    <div>
     
      <ContractPDF contractData={contractData} />

     
      <button onClick={() => handlePayment(contractId)}>Ir al Pago</button>
    </div>
  );
};
  


export default PaymentHistory;
