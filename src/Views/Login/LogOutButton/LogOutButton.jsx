import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const LogOutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <Button color="secondary" onClick={handleLogout}>Cerrar sesion</Button>;
};
