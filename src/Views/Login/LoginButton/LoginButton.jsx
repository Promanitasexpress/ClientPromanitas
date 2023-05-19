import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";



export const LoginButton = () => {

    const { loginWithRedirect } = useAuth0()


    const handleLogin = async() => {
        await loginWithRedirect({
            appState:{
                returnTo: '/profile',
            }
        })
    }

    return (
            <Button color="secondary" onClick={handleLogin}>Iniciar sesion</Button>
    )
}

