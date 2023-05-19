import React from "react";
// import PaginatedComponent from "../../Components/Paginado/paginado";
import Footer from "../../Components/Footer/Footer.jsx";
import { Container } from "@mui/material";
import SearchBarFilter from "../../Components/SercrBarFilter/SearchBarFilter";
import AllCardsContainer from "../../Components/AllCardsContainer/AllCardsContainer";


const Home = () => {
  return (
    <Container>
      <SearchBarFilter />
      <AllCardsContainer />
      <Footer/>
    </Container>
   
  );
};

export default Home;
