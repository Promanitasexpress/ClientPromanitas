import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Coments from "../../Components/ComentsDetail/ComentsDetail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Container,
  Typography,
  Divider,
  Grid,
  Box,
  useTheme,
  Avatar,
} from "@mui/material";
import Maps from "../../Components/MapsComponent/Maps";
import {  getPostDetail } from "../../Redux/Actions/detailAction";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../../Redux/Actions/userAction";
import Alert from "@mui/material/Alert";
import Footer from "../../Components/Footer/Footer";
import Rating from "@mui/material/Rating";
import PanToolIcon from "@mui/icons-material/PanTool";

const Detail = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [ratingResult, ] = useState(0);
  const theme = useTheme();



 
  useEffect(() => {
    dispatch(getPostDetail(id));
    // dispatch(getDetail(id));
    dispatch(getAllUsers());
  }, [dispatch, id]);

  const selectDetailData = useSelector((state) => ({
    adpostName: state.detail.adpost?.name,
    adpostDescription: state.detail.adpost?.description,
    adpostImage: state.detail.adpost?.image,
    userId: state.detail.adpost?.user?.id,
    userImage: state.detail.adpost?.user?.image,
    serviceName: state.detail.adpost?.service?.name,
    userCoordinates: state.detail.adpost?.user?.coordinates,
  }));
  const data = useSelector((state) => state.detail.detailPost);
  const users = useSelector((state) => state.user.allUsers);

  const userPost = data.dataUser;
  const adPost = data.dataPost;

  console.log("Post", adPost);
  console.log("User", userPost);

  const filteredUser = users.filter((elem) => elem.email === user.email);

  return (
    <Container
      sx={{
        background: theme.palette.primary.main,
        borderRadius: "10px",
        marginBottom: "60px",
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Avatar sx={{ width: 80, height: 80, marginTop: "5px" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${userPost?.image})`,
              backgroundSize: "cover",
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {userPost?.firstname.slice(0, 1).toUpperCase()}
          </Typography>
        </Avatar>
        <Typography variant="h4">
          {userPost?.firstname + " " + userPost?.lastname}
        </Typography>
      </Box>
      <Box>
        <Grid container>
          <Grid item md={6}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                minHeight: 200,
                minWidth: 200,
                maxWidth: "100%",
                borderRadius: "10px",
              }}
              src={adPost?.image}
              alt={userPost?.service}
            />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" textAlign="initial">
              {adPost?.service}
            </Typography>
            <Typography variant="h6" textAlign="center">
              {adPost?.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Container
        sx={{
          padding: "2rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Maps address={selectDetailData.userCoordinates} />
        <Box>
          <div>
          <Rating
          name="calificacion"
          value={ratingResult}
          precision={0.5}
          emptyIcon={<PanToolIcon sx={{ fontSize: 60, color: "#9e9e9e" }} />}
          icon={<PanToolIcon sx={{ fontSize: 60, color: "#1976d2" }} />}
          readOnly
        />
          </div>
          <br />
        </Box>
      </Container>
      <Coments />
      {filteredUser[0] && filteredUser[0].email ? (
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Button href="/contract/" variant="contained">
                Contratar
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                href={`/calification/${id}`}
                variant="contained"
              >
                Calificar
              </Button>
            </Grid>
            <Grid item>
              <Button href="/home" variant="contained">
                Volver
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      ) : (
        <Alert severity="warning">
          Por favor completa tus datos desde tu perfil para continuar.
        </Alert>
      )}
      <Footer />
    </Container>
  );
};

export default Detail;
