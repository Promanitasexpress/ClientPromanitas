import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Pagination } from "@mui/material";
import { getPaginated } from "../../Redux/Actions/paginatedAction";

export default function Paginated() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const dispatch = useDispatch();
  const pageSize = 6;
  useEffect(() => {
    dispatch(getPaginated(currentPageNumber, pageSize));
  }, [dispatch, currentPageNumber, pageSize]);

  const handleChangePage = (event, value) => {
    setCurrentPageNumber(value);
  };

  const data = useSelector((state) => state.paginated.allPro);
  const message = data.message;

  return (
    <Container
      sx={{
        marginTop: "5%",
        marginBottom: "5%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {message && (
        <Pagination
          page={currentPageNumber}
          onChange={handleChangePage}
          count={message.totalPages}
        />
      )}
    </Container>
  );
}
