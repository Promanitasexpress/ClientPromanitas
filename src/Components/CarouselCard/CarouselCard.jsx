import { Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function CarouselCard({ image, name, id }) {
  return (
    <Container>
      <Grid container>
        <Grid item md={5}>
          <img
            src={image}
            alt={name}
            width={"40%"}
            style={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item md={7}>
          <Typography variant="h2">
            <Link
              sx={{ textDecoration: "none", color: "inherit" }}
              href={`/home/search?cat=${id}`}
            >
              {name}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

