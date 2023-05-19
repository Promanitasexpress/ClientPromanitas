import * as React from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

export default function Terms() {
  return (
    <div>
      <Container
        sx={{
          backgroundColor: "white",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Grid justifyContent="center" alignItems="center" container>
          <Typography noWrap variant="h5" gutterBottom>
            Términos y condiciones
          </Typography>
        </Grid>
        <Grid justifyContent="row">
          <Typography>
            Estimado/a usuario/a, Gracias por utilizar nuestros servicios. Para
            poder brindarle una experiencia segura y satisfactoria, le
            solicitamos que lea detenidamente los términos y condiciones de uso
            que se describen a continuación. Al hacer clic en "Aceptar" o
            utilizar nuestros servicios, usted acepta y se compromete a cumplir
            con estos términos y condiciones. En estos términos y condiciones,
            se describen las obligaciones y responsabilidades tanto del usuario
            como de nuestra empresa.
          </Typography>
          <Typography>
            También se especifican las limitaciones y exclusiones de
            responsabilidad, así como los derechos de propiedad intelectual y
            las leyes aplicables. Es importante que entienda y acepte los
            términos y condiciones antes de utilizar nuestros servicios.Si tiene
            alguna duda o consulta, no dude en ponerse en contacto con nosotros.
            Le agradecemos por su confianza y esperamos poder brindarle un
            excelente servicio. La presente información establece los términos y
            condiciones que rigen el uso que usted, en adelante "el Usuario",
            haga de los servicios proporcionados por la Empresa. Por favor, lea
            atentamente estos términos y condiciones antes de utilizar los
            servicios de terceros.
          </Typography>
          <Typography>
            <Typography noWrap variant="h6" gutterBottom>
             * Aceptación de los términos y condiciones
            </Typography>
            Al utilizar los servicios de terceros, el Usuario acepta
            expresamente estos términos y condiciones, que se consideran
            vinculantes y obligatorios. Si el Usuario no acepta estos términos y
            condiciones, no podrá utilizar los servicios de terceros ofrecidos
            por la Empresa.
          </Typography>
          <Typography>
            <Typography noWrap variant="h6" gutterBottom>
             * Descripción de los servicios
            </Typography>
            La Empresa ofrece servicios de terceros que permiten al Usuario
            realizar diversas actividades, como acceder a productos y servicios
            de terceros a través de nuestra plataforma en línea. Estos servicios
            de terceros son proporcionados por proveedores externos, que pueden
            tener sus propios términos y condiciones de uso. La Empresa no se
            hace responsable de los servicios de terceros proporcionados por
            proveedores externos.
          </Typography>
          <Typography>
            <Typography noWrap variant="h6" gutterBottom>
             * Responsabilidad del Usuario
            </Typography>
            El Usuario es el único responsable de cualquier uso indebido de los
            servicios de terceros, incluyendo el incumplimiento de los términos
            y condiciones de los proveedores externos.El Usuario se compromete a
            utilizar los servicios de terceros de acuerdo con la ley y estos
            términos y condiciones.
          </Typography>
          <Typography>
            <Typography noWrap variant="h6" gutterBottom>
             * Propiedad intelectual
            </Typography>
            Los servicios de terceros y cualquier contenido proporcionado a
            través de ellos son propiedad de sus respectivos dueños.El Usuario
            reconoce y acepta que la Empresa no posee ninguna propiedad
            intelectual sobre los servicios de terceros ni sobre el contenido
            proporcionado a través de ellos
          </Typography>
          <Grid>
            <Typography>
              <Typography noWrap variant="h6" gutterBottom>
               * Limitaciones de responsabilidad
              </Typography>
              La Empresa no garantiza la disponibilidad, confiabilidad, calidad,
              seguridad o integridad de los servicios de terceros. La Empresa no
              será responsable de ningún daño directo, indirecto, incidental,
              especial o consecuente que surja del uso de los servicios de
              terceros.
            </Typography>
            <Typography>
              <Typography noWrap variant="h6" gutterBottom>
               * Indemnización
              </Typography>
              El Usuario acepta indemnizar, defender y mantener indemne a la
              Empresa y a sus afiliados, empleados, directores y agentes de
              cualquier reclamo, demanda, acción, costo, responsabilidad,
              pérdida o daño, incluyendo los honorarios de abogados, que surjan
              del uso de los servicios de terceros o del incumplimiento de estos
              términos y condiciones.
            </Typography>
            <Typography>
              <Typography noWrap variant="h6" gutterBottom>
               * Modificación de los términos y condiciones
              </Typography>
              La Empresa se reserva el derecho de modificar estos términos y
              condiciones en cualquier momento y sin previo aviso. El Usuario es
              responsable de revisar regularmente estos términos y condiciones
              para conocer cualquier cambio.
            </Typography>
            <Typography>
              <Typography noWrap variant="h6" gutterBottom>
               * Terminación del servicio
              </Typography>
              La Empresa se reserva el derecho de terminar el servicio en
              cualquier momento y sin previo aviso. La Empresa no será
              responsable ante el Usuario ni ante terceros por la terminación de
              los servicios.
            </Typography>
            <Typography>
              <Typography noWrap variant="h6" gutterBottom>
               * Ley aplicable
              </Typography>
              Estos términos y condiciones se regirán e interpretarán de acuerdo
              con las leyes del país en el que se encuentra la Empresa.
            </Typography>
            Atentamente,<h4>ProManitas.</h4> 
          </Grid>

          

          <Toolbar>
            <Button
              href="/home"
              color="secondary"
              style={{ backgroundColor: "#e7eaf6" }}
            >
              VOLVER
            </Button>
          </Toolbar>
        </Grid>
      </Container>
    </div>
  );
}
