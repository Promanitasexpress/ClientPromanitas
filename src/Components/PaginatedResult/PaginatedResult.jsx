import React from "react";
import { Container, Pagination } from "@mui/material";

const PaginatedResult = ({ searchPerPage, totalServices, paginatedFunc }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalServices / searchPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        page={1}
        onChange={(event, value) => paginatedFunc(value)}
        count={pageNumbers.length}
      />
    </Container>
  );
};

export default PaginatedResult;
