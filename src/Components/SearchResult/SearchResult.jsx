import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBarFilter from "../SercrBarFilter/SearchBarFilter";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardAdPost from "../CardAdPost/CardAdPost";
import { getServices, searchAction } from "../../Redux/Actions/searchAction";
import PaginatedResult from "../PaginatedResult/PaginatedResult";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function SearchResult() {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const preCatSelected = query.get("cat");
  const preinputSearch = query.get("search");
  useEffect(() => {
    dispatch(getServices());
    if (!preinputSearch && !preCatSelected) {
      dispatch(searchAction(preinputSearch, preCatSelected));
    }
    if (preinputSearch) {
      dispatch(searchAction(preinputSearch, null));
    }
    if (preCatSelected) {
      dispatch(searchAction(null, preCatSelected));
    }
  }, [dispatch, preCatSelected, preinputSearch]);
  const services = useSelector((state) => state.search.services);
  const search = useSelector((state) => state.search.search);

  // lógica de paginado
  const [searchPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastService = currentPage * searchPerPage;
  const indexOfFirstService = indexOfLastService - searchPerPage;
  const currentSearch = search.slice(indexOfFirstService, indexOfLastService);

  const paginatedFunc = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log("los servicios", services);
  console.log(search.length);

  return (
    <Container>
      <SearchBarFilter
        preinputSearch={preinputSearch}
        preCatSelected={preCatSelected}
      />
      <Container>
        {services.length === 0 || currentSearch.length === 0 ? (
          <SkeletonCard />
        ) : (
          <Grid container spacing={2} justifyContent={"center"}>
            {services.length &&
              currentSearch.length > 0 &&
              currentSearch.map((element, index) => (
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
      </Container>
      {search.length > 6 && (
        <PaginatedResult
          searchPerPage={searchPerPage}
          totalServices={search.length}
          paginatedFunc={paginatedFunc}
        />
      )}
    </Container>
  );
}
