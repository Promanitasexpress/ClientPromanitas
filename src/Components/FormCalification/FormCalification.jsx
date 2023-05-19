import React, { useState } from "react";
import { sendRatingSuccess} from "../../Redux/Reducer/ratingReducer";
import { useDispatch } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import PanToolIcon from "@mui/icons-material/PanTool";
import { Rating } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

function RatingForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [contractId, setContractId] = useState(""); 
  const { user } = useAuth0();
  const username = user ? user.username : "";
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRatingSuccess(id, username, ratingValue));
    alert(`Calificación enviada: ${ratingValue}`);
    setRatingValue(0);
    navigate(-1)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: 24,
        }}
      >
        <Rating
          name="simple-controlled"
          value={ratingValue}
          precision={0.5}
          emptyIcon={<PanToolIcon sx={{ fontSize: 60, color: "#9e9e9e" }} />}
          icon={<PanToolIcon sx={{ fontSize: 60, color: "#1976d2" }} />}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", fontSize: 24 }}>
        <label style={{ marginRight: "16px", marginLeft: "8px" }}>
          Califica el aviso con la cantidad de ProManitas que merece!
        </label>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          label="Número de Contrato"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Enviar calificación
        </Button>
      </Box>
    </form>
  );
}

export default RatingForm;

