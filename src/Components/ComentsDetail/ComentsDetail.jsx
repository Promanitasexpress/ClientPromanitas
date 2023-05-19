import {
  Button,
  Container,
  TextareaAutosize,
  Typography,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Coments = () => {
  const [comentario, setComent] = useState("");
  const [comentarios, setComents] = useState([]);
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setComents([...comentarios, comentario]);
    setComent("");
  };

  return (
    <Container maxWidth="xl" sx={{ marginBottom: "30px" }}>
      <Box
        sx={{
          background: theme.palette.primary.main,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Preguntas y respuestas
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextareaAutosize
                aria-label="comentario"
                placeholder="Escribe tu pregunta aquí"
                value={comentario}
                onChange={(e) => setComent(e.target.value)}
                rows={6}
                cols={50}
                sx={{
                  width: "100%",
                  p: 1,
                  my: 2,
                  borderRadius: 1,
                  border: "1px solid #ccc",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" type="submit" fullWidth>
                Envía tu Pregunta
              </Button>
            </Grid>
          </Grid>
        </form>
        <List sx={{ listStyleType: "none", m: 0, p: 0 }}>
          {comentarios.map((coment, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ccc", p: 2 }}>
              <ListItemText>{coment}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Coments;
