import { Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonCard() {
  return (
    <Grid container spacing={2} justifyContent={"center"} marginTop={"10px"}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Card sx={{ padding: 0 }}>
            <CardContent>
              <Skeleton />
              <Skeleton />
            </CardContent>
            <Skeleton variant="rectangular" height={250} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
