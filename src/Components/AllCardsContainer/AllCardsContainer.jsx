import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardAdPost from "../CardAdPost/CardAdPost";
import { getServices } from "../../Redux/Actions/searchAction";
import Paginated from "../Paginated/Paginated";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function AllCardsContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  const data = useSelector((state) => state.paginated.allPro);
  const posts = data.data;
  const services = useSelector((state) => state.search.services);

  // console.log("Mis posteos", posts);
  // console.log("Mis servicios", services);

  return (
    <Container>
      {services.length === 0 ? (
        <SkeletonCard />
      ) : (
        <Grid container spacing={2} justifyContent={"center"}>
          {posts?.map((element, index) => (
            <CardAdPost
              key={index}
              id={element.id}
              name={element.name}
              services={services}
              serviceID={element.ServiceId}
              image={element.image}
            />
          ))}
        </Grid>
      )}
      <Paginated />
    </Container>
  );
}
