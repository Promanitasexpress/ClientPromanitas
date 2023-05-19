import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const SignUpButton = () => {

    const {loginWithRedirect} = useAuth0()

    const handleSignUp = async() => {
        await loginWithRedirect({
            appState: {
                returnTo:"/profile",
            },
            authorizationParams:{
                screen_hint: "signup",
            }
        })
    }
    return (
        <div>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

