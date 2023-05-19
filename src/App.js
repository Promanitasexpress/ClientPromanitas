import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthenticationGuard } from "./Views/Login/AuthenticationGuard/authentication-guard";
import { useAuth0 } from "@auth0/auth0-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar";
import SearchResult from "./Components/SearchResult/SearchResult.jsx";
import FormPosteo from "./Components/FormPosteo/FormPosteo.jsx";
import Detail from "./Views/Detail/Detail";
import AgreementArea from "./Components/AgreementArea/ChatAgreement";
import RegistryForm from "./Views/Login/RegistryForm/RegistryForm.jsx";
import Profile from "./Views/Login/Profile/Profile.jsx";
import UserDetail from "./Views/UserDetail/UserDetail.jsx";
import FooterForm from "./Components/Footer/FooterForm/FooterForm.jsx";
import Terms from "./Components/Footer/Terms";
import About from "./Components/About/About.jsx";
import UnderConstruction from "./Components/UnderConstruction/UnderConstruction.jsx";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm.jsx";
import RegistryFromMail from "./Views/Login/RegistryForm/RegistryFromMail";
import ContractsAll from "./Components/ContractForm/ContractsAll.jsx";
import PaymentHistory from "./Components/paymentHistory/paymentHistory";
import ContractForm from "./Components/ContractForm/ContractForm";
import MyContrat from "./Components/MyContrat/MyContrat";
import MyNotices from "./Components/MyNotices/MyNotices";
import RatingForm from "./Components/FormCalification/FormCalification";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

const { REACT_APP_STRIPE_PUBLIC } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC);

const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e7eaf6",
    },
    secondary: {
      main: "#113f67",
    },
    background: {
      default: "#a2a8d3",
    },
  },
});

const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#e7eaf6",
    },
    background: {
      default: "#113f67",
    },
  },
});

function App() {
  const location = useLocation();
  const { isLoading } = useAuth0();
  const currentTheme = useSelector((state) => state.theme.themeSelected);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className="App">
      <ThemeProvider theme={currentTheme === "light" ? themeLight : themeDark}>
        <CssBaseline />
        <div className="App">
          {location.pathname !== "/" &&
            location.pathname !== "/login" &&
            location.pathname !== "/construction" && <Navbar />}
        </div>
       
        <Routes>
          <Route path ="/contracts" element = {<MyContrat/>} />
          <Route path="/notices" element ={<MyNotices/>} />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/home/search" element={<SearchResult />} />
          
          <Route path="/contract" element={<ContractForm />} />
          <Route path="/pdf" element={<ContractsAll />} />
          <Route path="/calification/:id" element={<RatingForm />} />
          <Route
            path="/posteo"
            element={<AuthenticationGuard component={FormPosteo} />}
          />
          <Route
            path="/detail/:id"
            element={<AuthenticationGuard component={Detail} />}
          />
          <Route
            path="/contract/"
            element={<AuthenticationGuard component={AgreementArea} />}
          />
          <Route path="/registryForm" element={<RegistryForm />} />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={Profile} />}
          />
          <Route path="/pdf/:id" element={<ContractsAll />} />
          <Route path="/phistory" element={<PaymentHistory />} />
          <Route path="/registryFromMail" element={<RegistryFromMail />} />
          <Route
            path="userdetail/:id"
            element={<AuthenticationGuard component={UserDetail} />}
          />
          <Route path="/contact" element={<FooterForm />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/construction" element={<UnderConstruction />} />
          <Route
             path="/payment/:id"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            }
          />
        </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
