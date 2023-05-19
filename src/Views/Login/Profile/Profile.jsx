import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/Actions/userAction";
import Button from "@mui/material/Button";

import { Avatar, Card, CardContent, Typography } from "@mui/material";

const Profile = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.user.allUsers);

  const filteredUser = Array.isArray(users)
    ? users.filter((elem) => elem.email === user.email)
    : [];


  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Card style={{ marginBottom: 20 }}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "4px solid  #e7eaf6",
            width: "100%",
          }}
        >
          {filteredUser[0] && filteredUser[0].image ? (
            <Avatar
              src={filteredUser[0].image}
              alt={filteredUser[0].username}
              style={{ width: 250, height: 250 }}
            />
          ) : (
            <Avatar
              src={user.picture}
              alt={user.name}
              style={{ width: 250, height: 250 }}
            />
          )}

          {filteredUser[0] && filteredUser[0].firstname ? (
            <Typography
              variant="h4"
              style={{ marginTop: 20, fontFamily: "franklin gothic " }}
            >
              ¡Hola {filteredUser[0].firstname}, estás en ProManitas!
            </Typography>
          ) : (
            <Typography
              variant="h4"
              style={{ marginTop: 20, fontFamily: "franklin gothic" }}
            >
              ¡Hola {user.name}, estás en ProManitas!
            </Typography>
          )}

          <Typography
            variant="body1"
            style={{ marginTop: 40, fontFamily: "franklin gothic " }}
          >
            Tu cuenta de correo registrada: {user.email}
          </Typography>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              href="/home"
              sx={{
                my: 2,
                display: "block",
                boxShadow: "0px 3px 6px rgba(90, 113, 217, 0.16)",
              }}
              color="secondary"
            >
              Ir a Home
            </Button>

            {filteredUser[0] && filteredUser[0].email ? (
              <Button
                href={`/userdetail/${filteredUser[0].id}`}
                sx={{
                  my: 2,
                  display: "block",
                  boxShadow: "0px 3px 6px rgba(90, 113, 217, 0.16)",
                }}
                color="secondary"
              >
                Modificar usuario
              </Button>
            ) : (
              <Button
                href="/registryFromMail"
                sx={{
                  my: 2,
                  display: "block",
                  boxShadow: "0px 3px 6px rgba(90, 113, 217, 0.16)",
                }}
                color="secondary"
              >
                ¡Completa tus datos!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

