import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendContract } from "../../Redux/Actions/contractAction";
import {
  TextField,
  Button,
  Checkbox,
  Grid,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../../Redux/Actions/userAction";

const ContractForm = () => {
  const { user } = useAuth0();
  const textDescription =
    "*Con la creación de este contrato, usted acepta y se compromete a cumplir con nuestros términos y condiciones donde se describen las obligaciones y responsabilidades tanto del usuario como de nuestra empresa. ";

  const [contractData, setContractData] = useState({
    dateJob: "",
    detail: "",
    description: "",
    payment: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    let fieldValue = event.target.type === "checkbox" ? checked : value;
    console.log("prob", fieldValue);
    if (name === "payment") {
      let numericValue = parseFloat(value);
      console.log("probando", numericValue);
      fieldValue = isNaN(numericValue) ? null : numericValue;
    }

    setContractData({
      ...contractData,
      [name]: fieldValue,
    });
  };

  const usersDb = useSelector((state) => state.user.allUsers);

  const filteredUser = usersDb.filter((elem) => elem.email === user.email);

  const [, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      dispatch(
        sendContract(
          contractData.payment,
          filteredUser[0].username,
          contractData.detail,
          user.email
        )
      );

      navigate(`/pdf/${filteredUser[0].id}`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre Completo"
            name="name"
            value={contractData.name}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        {filteredUser[0] && filteredUser[0].email ? (
          <div>
            <Grid item xs={12}>
              <TextField
                label="Nombre de Usuario"
                name="username"
                defaultValue={filteredUser[0].username} // Mostrar el nombre de usuario en el campo de texto
                readOnly
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </div>
        ) : null}
        <Grid item xs={12}>
          <TextField
            label="Detalles del Contrato"
            name="detail"
            value={contractData.detail}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
            placeholder="Ejemplo: se reparará cerradura en puerta de aluminio..."
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Monto Acordado"
            name="payment"
            value={contractData.payment}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="rating_commitment"
                color="secondary"
                checked={contractData.rating_commitment}
                onChange={handleChange}
                required
              />
            }
            label="Me comprometo a calificar una vez hecho el trabajo"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Revisar Contrato
          </Button>
        </Grid>
        <Grid item xs={12}>
          <span>
            <label for="terminos-condiciones">Terminos y Condiciones</label>
            <span id="terminos-condiciones" readonly>
              {textDescription}
              <a href="/terms" target="_blank">
                Terminos y Condiciones
              </a>
            </span>
          </span>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContractForm;
//
