import {
  AppBar,
  Button,
  Grid,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Box, Container, ThemeProvider } from "@mui/system";
import React, { useEffect } from "react";
import icon from "./../../Images/icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Login/LoginButton/LoginButton";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../Redux/Actions/searchAction";
import CarouselCard from "../../Components/CarouselCard/CarouselCard";

export default function Landing() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  const services = useSelector((state) => state.search.services);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters>
        <AppBar sx={{ background: theme.palette.primary.main }}>
          <Toolbar>
            <Grid justifyContent="center" alignItems="center" container>
              <Grid>
                {!isAuthenticated && (
                  <Link>
                    <LoginButton />
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link href="/registryForm">
                    <Button color="secondary">Registrarse</Button>
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link href="/home">
                    <Button color="secondary">Ingresar como invitado</Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Link href="/home">
                    <Button color="secondary">Ingresar</Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: "50px" }}></div>
        <Grid container>
          <Grid item xs={8}>
            <Box
              sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography align="center" variant="h1">
                Bienvenido a promanitas
              </Typography>
              <Typography align="center" variant="h5" marginTop={"2%"}>
                ¿Necesita ayuda en el hogar? Encuentre soluciones en nuestra
                página web de servicios técnicos. Con una variedad de opciones
                de reparación y mantenimiento, encontrará lo que necesita para
                mantener su hogar funcionando sin problemas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <img
              src={icon}
              alt="Promanitas Logo"
              placeholder="Promanitas"
              width={"80%"}
              height={"80%"}
              style={{ marginTop: "30px" }}
            />
          </Grid>
        </Grid>
        <Box>
          <Carousel
            sx={{
              background: theme.palette.primary.main,
              margin: 0,
              padding: 0,
            }}
            indicatorIconButtonProps={{
              style: {
                color: "black",
                fontSize: "52px",
              },
            }}
            duration={1000}
            interval={5000}
            animation="slide"
            fullHeightHover={false}
          >
            {services?.map((service, index) => (
              <CarouselCard
                image={service.image}
                name={service.name}
                id={service.id}
                key={index}
              />
            ))}
          </Carousel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
