import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Hidden, Link, Switch, useTheme } from "@mui/material";
import icon from "./../../Images/icon.png";
import { LoginButton } from "../../Views/Login/LoginButton/LoginButton";
import { LogOutButton } from "../../Views/Login/LogOutButton/LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { selectMode } from "../../Redux/Actions/themeActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../Redux/Actions/userAction";

const pages = [{ message: "Publicar aviso", route: "/posteo" }];
const settings = [
  { message: "Ver Perfil", route: "/profile/" },
  { message: "Mis avisos", route: "/notices" },
  { message: "Mis contratos", route: "/contracts" },
];

export default function NavBar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const { user } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const themeSelected = useSelector((state) => state.theme.themeSelected);
  const users = useSelector((state) => state.user.allUsers);

  const filteredUser = Array.isArray(users)
    ? users.filter((elem) => elem.email === user?.email)
    : [];

  const initialdb = filteredUser[0]?.firstname?.slice(0, 1).toUpperCase();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const switchThemeHandler = () => {
    dispatch(selectMode());
  };

  return (
    <Container maxWidth="xl">
      <AppBar
        sx={{ background: theme.palette.primary.main, padding: 0 }}
        position="fixed"
      >
        <Toolbar>
          <Hidden mdDown>
            <img
              src={icon}
              alt="logo"
              style={{ height: "60px", marginRight: "10px", margin: "1.5%" }}
            />
          </Hidden>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              font: "inherit",
            }}
          >
            Promanitas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated &&
                pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link href={page.route}>
                      <Button color="secondary">{page.message}</Button>
                    </Link>
                  </MenuItem>
                ))}
              {!isAuthenticated && (
                <MenuItem>
                  <Link>
                    <LoginButton />
                  </Link>
                </MenuItem>
              )}
              {!isAuthenticated && (
                <MenuItem>
                  <Link href="/registryForm">
                    <Button color="secondary">Registrarse</Button>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Hidden mdUp>
            <img
              src={icon}
              alt="logo"
              style={{ height: "60px", marginRight: "10px", margin: "1.5%" }}
            />
          </Hidden>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              font: "inherit",
            }}
          >
            Promanitas
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated &&
              pages.map((page, index) => (
                <Link href={page.route} key={index}>
                  <Button
                    color="secondary"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    {page.message}
                  </Button>
                </Link>
              ))}
          </Box>
          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Link sx={{ my: 2, display: "block" }}>
                <LoginButton />
              </Link>
              <Link href="/registryForm">
                <Button sx={{ my: 2, display: "block" }} color="secondary">
                  Registrarse
                </Button>
              </Link>
            </Box>
          )}

          <Switch
            onClick={switchThemeHandler}
            checked={themeSelected === "dark" ? true : false}
            color="secondary"
          />
          <Typography marginRight={"2%"}>Modo Oscuro</Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <Tooltip title={filteredUser[0]?.firstname || user.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {filteredUser[0] && filteredUser[0].image ? (
                    filteredUser[0] &&
                    filteredUser[0].image && (
                      <Avatar
                        sx={{ width: 40, height: 40, position: "relative" }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${filteredUser[0].image})`,
                            backgroundSize: "cover",
                          }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {initialdb}
                        </Typography>
                      </Avatar>
                    )
                  ) : (
                    <Avatar
                      sx={{ width: 40, height: 40, position: "relative" }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${user.picture})`,
                          backgroundSize: "cover",
                        }}
                      />
                      {user.name.slice(0, 1)}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link href={setting.route}>
                    <Button color="secondary">{setting.message}</Button>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Link>
                  <LogOutButton />
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "5em" }}></div>
    </Container>
  );
}
