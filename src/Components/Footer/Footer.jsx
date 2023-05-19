import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { AppBar, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Container>
      <div style={{ paddingTop: "50px" }}></div>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.primary.main,
          width: "100%",
          marginTop: "auto",
          top: "auto",
          bottom: 0,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        
          <Button
            href="/about"
            sx={{ my: 2, display: "block" }}
            color="secondary"
          >
            QUIENES SOMOS
          </Button>
          <Button
            href="/contact"
            sx={{ my: 2, display: "block" }}
            color="secondary"
          >
            CONTACTO
          </Button>
          <Button
            href="/terms"
            sx={{ my: 2, display: "block" }}
            color="secondary"
          >
            TERMINOS Y CONDICIONES
          </Button>
        </Toolbar>
        <Typography variant="body1" color="inherit" align="center" sx={{ fontSize: "0.9rem" }}>
            © 2023 Todos los derechos reservados
          </Typography>
      </AppBar>
    </Container>
  );
};

export default Footer;

//