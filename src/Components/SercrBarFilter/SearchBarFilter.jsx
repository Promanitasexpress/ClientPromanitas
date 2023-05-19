import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanSearch, getServices } from "../../Redux/Actions/searchAction";

export default function SearchBarFilter({ preinputSearch, preCatSelected }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [service, setService] = useState("");
  useEffect(() => {
    if (!preinputSearch && !preCatSelected) {
      navigate(`/home`);
    }
    if (preinputSearch) {
      setInput(preinputSearch);
    }
    if (preCatSelected) {
      setService(preCatSelected);
    }
    dispatch(getServices());
    return () => dispatch(cleanSearch());
  }, [dispatch, preinputSearch, preCatSelected, navigate]);
  const services = useSelector((state) => state.search.services);

  const changeHandler = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const changeSelect = (event) => {
    let selected = event.target.value;
    if (selected === "undefined") {
      selected = null;
    }
    setService(selected);
    if (preinputSearch) {
      navigate(`/home/search?search=${input}&cat=${selected}`);
    } else {
      navigate(`/home/search?cat=${selected}`);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    if (input) {
      if (preCatSelected) {
        navigate(`/home/search?search=${input}&cat=${service}`);
      } else {
        navigate(`/home/search?search=${input}`);
      }
    }
  };

  return (
    <Container
      sx={{
        marginTop: "1%",
        background: theme.palette.primary.main,
        paddingBottom: "1.5%",
        paddingTop: "3%",
        borderRadius: "5px",
      }}
    >
      <Toolbar>
        <Grid container alignItems={"center"} spacing={2}>
          <FormControl>
            <Grid item>
              <TextField
                variant="outlined"
                label="Buscar"
                sx={{
                  alignItems: "center",
                  "& .MuiInputLabel-shrink": {
                    color: "darkgray !important",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "darkgray",
                    },
                    height: "40px",
                    "& fieldset": {
                      height: "60px",
                    },
                  },
                }}
                inputProps={{
                  style: { paddingTop: "29px" },
                }}
                onChange={changeHandler}
                value={input}
              />
              <IconButton onClick={searchHandler} size="large">
                <Search />
              </IconButton>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid
              item
              sx={{ height: "40px", display: "flex", alignItems: "center" }}
            >
              <InputLabel
                sx={{
                  "&.Mui-focused": {
                    color: "darkgray",
                  },
                  "& .MuiOutlinedLabel-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "darkgray",
                    },
                  },
                }}
              >
                Rubro
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                variant="filled"
                value={service}
                onChange={changeSelect}
                sx={{
                  width: "8em",
                  height: "55px",
                  marginTop: "10%",
                  paddingBottom: "15px",
                  "& .MuiSelect-root": {
                    "& .MuiInputBase-root": {
                      alignItems: "center",
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {services?.map((service, index) => (
                  <MenuItem key={index} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </FormControl>
        </Grid>
      </Toolbar>
    </Container>
  );
}

//   // actions para data avisos
//   export const getAdposts = () => {
//       return async (dispatch) => {
//         try {
//           const response = await axios.get('https://promanitasapi.onrender.com/api/v1/adposts');
//           dispatch({ type: 'GET_ADPOSTS_SUCCESS', payload: response.data.data });
//         } catch (error) {
//           dispatch({ type: 'GET_ADPOSTS_ERROR', payload: error.message });
//         }
//       };
//     };
//   //actions para los data
//   export const getServices = () => {
//       return async (dispatch) => {
//         try {
//           const response = await axios.get('https://promanitasapi.onrender.com/api/v1/services/');
//           dispatch({ type: 'GET_SERVICES_SUCCESS', payload: response.data.data });
//         } catch (error) {
//           dispatch({ type: 'GET_SERVICES_ERROR', payload: error.message });
//         }
//       };
//     };

//     //y action para adpost por name

//     export const filterAdpostsByName = (name) => {
//       return { type: 'FILTER_ADPOSTS_BY_NAME', payload: name };
//     };

//     // action para filtrar por name de services
//     export const filterServicesByName = (name) => {
//       return { type: 'FILTER_SERVICES_BY_NAME', payload: name };
//     };

//     //reducer
//     const initialState = {
//       adposts: [],
//       services: [],
//       filteredAdposts: [],
//       filteredServices: [],
//       error: null
//     };

//     const rootReducer = (state = initialState, action) => {
//       switch (action.type) {
//         case 'GET_ADPOSTS_SUCCESS':
//           return { ...state, adposts: action.payload, filteredAdposts: action.payload, error: null };
//         case 'GET_ADPOSTS_ERROR':
//           return { ...state, error: action.payload };
//         case 'GET_SERVICES_SUCCESS':
//           return { ...state, services: action.payload, filteredServices: action.payload, error: null };
//         case 'GET_SERVICES_ERROR':
//           return { ...state, error: action.payload };
//         case 'FILTER_ADPOSTS_BY_NAME':
//           const filteredAdposts = state.adposts.filter(adpost => adpost.name.toLowerCase().includes(action.payload.toLowerCase()));
//           return { ...state, filteredAdposts };
//         case 'FILTER_SERVICES_BY_NAME':
//           const filteredServices = state.services.filter(service => service.name.toLowerCase().includes(action.payload.toLowerCase()));
//           return { ...state, filteredServices };
//         default:
//           return state;
//       }
//     };

//     export default rootReducer;

// //y aca en el componente de filtrado lo renderizas
//     import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// //import { getAdposts, getServices, filterAdpostsByName, filterServicesByName } from

// const fultradoPor.. = ({ adposts, services, filteredAdposts, filteredServices, error, getAdposts, getServices, filterAdpostsByName, filterServicesByName }) => {
//   const [filterName, setFilterName] = useState('');

//   //useEffect(() => { etc etc.....jajaj
