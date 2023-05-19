import React, { useEffect } from 'react';
import ContractPDF from './ContractPDF'
import { useAuth0 } from "@auth0/auth0-react"; 
import { useDispatch, useSelector } from "react-redux";
import { getAllContracts } from "../../Redux/Actions/contractAction"
import { getAllUsers } from "../../Redux/Actions/userAction";
import {Link} from "react-router-dom"
import { Button } from '@mui/material';

const ContractsAll = () => {

    const { user } = useAuth0();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllContracts());
      dispatch(getAllUsers());
    }, [dispatch]);
  
    const allContracts = useSelector((state) => state.contracts.contracts);
    const usersDb = useSelector((state) => state.user.allUsers);
  
    const filteredUser = usersDb.filter((elem) => elem.email === user.email);
  
    const filterInfo = allContracts.filter(inf => inf.UserId === filteredUser[0].id);
  
    const textDescription =
      "**Con la creación de este contrato, usted acepta y se compromete a cumplir con nuestros términos y condiciones donde se describen las obligaciones y responsabilidades tanto del usuario como de nuestra empresa. ";
  
    const lastContractId = filterInfo.length > 0 ? filterInfo[filterInfo.length - 1].id : null;
  
    return (
      <div>
        {lastContractId && (
          <Link to={`/payment/${lastContractId}`}>
   
            <Button variant="contained" color="primary">
              Pagar último contrato
            </Button>
          </Link>
        )}
        {filterInfo?.map(inf => (
          <ContractPDF 
            contractId={inf.id}
            username={filteredUser[0].username}
            description={textDescription}
            detail={inf.detail}
            payment={inf.payment}
          />
        ))}
      </div>
    );
  }
  
  export default ContractsAll;