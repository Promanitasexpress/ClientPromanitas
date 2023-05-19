import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const grupoPromanitas = [
  {
    name: "Julian",
    image: "https://avatars.githubusercontent.com/u/105263588?v=4 ",
    
    description: "Desarrollador FullStack",
    linkedin: "",
    github: "https://github.com/Srezequielr",
  },
 
  {
    name: "Gabriela",
    image:
      "https://avatars.githubusercontent.com/u/46719844?v=4 ",
    
    description: "Desarrollador FullStack",
    linkedin:
      "https://www.linkedin.com/in/gabriela-acevedo-512414a9/?locale=en_US",
    github: "https://github.com/gabydesi",
  },
  {
    name: "Yanina",
    image:
      "https://avatars.githubusercontent.com/u/105172384?s=400&u=b7485ebd3331e4bd9894315b41ddd316b0b2713f&v=4 ",
    
    description: "Desarrollador FullStack",
    linkedin: "https://www.linkedin.com/in/yanina-zurcher-1945b6254",
    github: "https://github.com/yanirc1981",
  },
   {
    name: "Maria",
    image: " https://avatars.githubusercontent.com/u/111536207?v=4",
    
    description: "Desarrollador FullStack",
    linkedin: "",
    github: "https://github.com/Mlobeto/",
  },
  {
    name: "Manuel",
    image: "https://avatars.githubusercontent.com/u/101506122?v=4",
    
    description: "Desarrollador FullStack",
    linkedin: "",
    github: "https://github.com/Zetta94",
  },
 
  {
    name: "Lucio",
    image: "https://avatars.githubusercontent.com/u/98289398?v=4 ",
    
    description: "Desarrollador FullStack",
    linkedin: "",
    github: "https://github.com/lucioSantia",
  },
  {
    name: "Kevin",
    image: "https://avatars.githubusercontent.com/u/104286335?v=4 ",
    
    description: "Desarrollador FullStack",
    linkedin: "",
    github: "https://github.com/RaiderAlf",
  },
  {
    name:"Mariana",
    image:
      "https://avatars.githubusercontent.com/u/116116275?v=4",
    
    description: "Desarrollador FullStack",
    linkedin: "https://www.linkedin.com/in/marigaby-flores-0a2540255",
    github: "https://github.com/Marigabyfc",
  },
 
];

const theme = createTheme();
export default function About() {
  return (
    <ThemeProvider theme={theme}>
       <Typography
            variant="h1"
            noWrap
            component="a"
            backgroundColor="#eef0ce"
            
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              font: "inherit",
              fontSize: "2rem", 
              paddingBottom: "1.5rem",
              paddingLeft:"5rem",
              paddingRight:"5rem",
               paddingTop: "1.5rem",
               textAlign: "center", 
            }}
          >
          Equipo de Desarrollo
          </Typography>
      
      <CssBaseline />

      <Container sx={{ py: 15 }} maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={4}>
          
          {grupoPromanitas.map((grupoPromanitas) => (
            <Grid item key={grupoPromanitas} xs={12} sm={4} md={3}>
              <Card style={{ backgroundColor: "#eef0ce", width:"350px", margin:"30px 30px 0 0"}}>
              
                <CardContent sx={{ flexGrow: 1, paddingBottom: 0, paddingTop: 2 }}>
                <div style={{ textAlign: 'center' }}>
                  <Typography gutterBottom variant="h4" component="h2" align="center" fontFamily={"serif"}>
                    {grupoPromanitas.name}
                  </Typography>
                  </div>
                  <CardMedia style={{paddingTop:4, paddingBottom:4,transition: 200,
                    boxShadow: "0px 0px 5px 5px" , color:"white"}}
                
                component="img"
                sx={{
                  // 4:3
                  pt: "75%",
                }}
                image={grupoPromanitas.image}
                
              />
                  <Typography style={{ paddingTop:20,}} gutterBottom variant="h5" component="h1">{grupoPromanitas.description}</Typography>
                </CardContent>
                <CardActions style={{ paddingTop: 5 }} disableSpacing>
                  <IconButton
                    
                    aria-label="github"
                    href={grupoPromanitas.github}
                    target="_blank"
                   
                  >
                    <GitHubIcon color="black" sx={{ fontSize: 50 }} /> {/*secondary */}
                  </IconButton>
                  <IconButton
                  
                    aria-label="linkedin"
                    href={grupoPromanitas.linkedin}
                    target="_blank"
                    
                  >
                    <LinkedInIcon color="black" sx={{ fontSize: 50 }} />
                  </IconButton>
                  
                </CardActions>
                
              </Card>
              
            </Grid>
          ))}
       
        </Grid>
        <Toolbar >    
          <Button href="/home"   style={{ fontSize: '20px', backgroundColor: '#eef0ce', color: 'black',  }}>
            VOLVER
          </Button>
          </Toolbar>
      </Container>
    </ThemeProvider>
  );
}

