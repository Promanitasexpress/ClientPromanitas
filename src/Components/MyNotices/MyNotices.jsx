import React from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getPosts } from "../../Redux/Actions/noticesAction";
import { Container, Grid, Typography } from "@mui/material";
import { getAllUsers } from "../../Redux/Actions/userAction";
import CardAdPost from "../CardAdPost/CardAdPost";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const MyNoticesUser = () => {
  const { user } = useAuth0();
  const userA0 = user;
  const dispatch = useDispatch();
  let myUserID = [];

  useEffect(() => {
    dispatch(getServices());
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const allServices = useSelector((state) => state.notices.services);

  const allPosts = useSelector((state) => state.notices.adposts);

  const allUsers = useSelector((state) => state.user.allUsers);

  if (userA0) {
    myUserID = allUsers?.filter((user) => user.email === userA0.email);
    myUserID = myUserID[0]?.id;
  }

  const myPosts = allPosts.filter((post) => post.UserId === myUserID);

  console.log("mis posteos", myPosts, "/n todos los servicios", allServices);

  if (myPosts.length === 0 && allServices.length > 0) {
    return (
      <Container>
        <Typography align="center" variant="h2">No tienes posteos publicados</Typography>
      </Container>
    );
  }

  return (
    <Container>
      {myPosts.length === 0 && allServices.length === 0 ? (
        <SkeletonCard />
      ) : (
        <Grid container spacing={2} justifyContent={"center"}>
          {myPosts?.map((element, index) => (
            <CardAdPost
              key={index}
              id={element.id}
              name={element.name}
              services={allServices}
              serviceID={element.ServiceId}
              image={element.image}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyNoticesUser;
