import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";



export default function CardAdPost({ name, services, image, serviceID, id }) {

  let cardService = "";

  if (!serviceID) {
    cardService = services.length >= 6 ? services[5].name : "";
  } else {
    cardService =
      services?.find((service) => service.id === serviceID)?.name || "";
  }

  const { isAuthenticated } = useAuth0();


  return (
    <Grid item xs={12} sm={6} md={4}>
      {isAuthenticated ? (
        <Link href={`/detail/${id}`}>
          <Card sx={{ padding: 0 }}>
            <CardContent>
              <Typography variant="h5">{cardService}</Typography>
              <Typography variant="h6">{name}</Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={image}
              height={250}
              style={{ padding: 0 }}
            />
          </Card>
        </Link>
      ) : (
        <div
          onClick={() =>
            Swal.fire({
              icon: "warning",
              html: "Por favor inicia sesión o <a href='/registryForm'>registrate</a> para continuar",
              confirmButtonColor: "#bc2525",
            })
          }
        >
          <Card sx={{ padding: 0 }}>
            <CardContent>
              <Typography variant="h5">{cardService}</Typography>
              <Typography variant="h6">{name}</Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={image}
              height={250}
              style={{ padding: 0 }}
            />
          </Card>
        </div>
      )}
    </Grid>
  );
}
