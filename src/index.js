import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store/index";
import { Auth0ProviderWithNavigate } from "./Views/Login/auth0ProviderNavigate/auth0-provider-with-navigate";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </PersistGate>
    </React.StrictMode>
  </Provider>
);
