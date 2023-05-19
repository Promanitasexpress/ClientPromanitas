import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ContractForm from "../ContractForm/ContractForm";
import { useNavigate } from "react-router";

const socket = io("http://localhost:3000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    socket.emit("chat message", inputValue);
    setInputValue("");
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Container
        sx={{
          background: theme.palette.primary.main,
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          En este espacio podrás acordar con el profesional los detalles de
          contratación.
        </Typography>

        <ul
          style={{ listStyleType: "none", padding: "0", marginBottom: "20px" }}
        >
          {messages.map((message, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                padding: "10px",
              }}
            >
              {message}
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Mensaje"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginRight: "10px", flex: "1" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
          >
            Enviar
          </Button>
        </form>

        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Si ya han acordado fecha, precio y modalidad de trabajo. Completen el
          siguiente Formulario que luego recibirán por mail
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoBack}
          style={{ marginTop: "20px" }}
        >
          Volver
        </Button>
      </Container>

      <Container
        style={{
          borderRadius: "10px",
          padding: "20px",
        }}
        sx={{
          background: theme.palette.primary.main,
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <ContractForm />
      </Container>
    </Container>
  );
}

export default Chat;
