import React from "react";
import { useNavigate } from "react-router";
import {Formik, Field} from "formik";
import "./FooterForm.css";
import Swal from "sweetalert2";
import Footer from "../Footer";
import { Container } from "@mui/material";



const FooterForm =()=>{
    
    const navigate = useNavigate();

    
      function handleRegister(values) {
        
      
      // Redirigir al usuario a la ruta "home"
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
   
return(
    <Container className="container" >
    <Formik 
    initialValues={{
        nombre:"",
        email:"",
        asunto:"",
        mensaje:""
    }}
    validate={(data)=>{
       let errors={}; 

       if(!data.nombre){
        errors.nombre = "Por favor ingresa tu nombre"
      } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(data.nombre)){
        errors.nombre = "El nombre sólo puede contener letras y espacios"
      }
      if (!data.email) {
        errors.email = "Por favor ingresa tu correo electrónico";
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)
      ) {
        errors.email =
          "El correo sólo puede contener letras, números, guiones y guión bajo";
      }

    return errors;
    }}
    onSubmit={(value, {resetForm})=>{
    resetForm();
      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        html: "Tu mensaje se ha enviado correctamente, pronto estaremos en contacto.",
        confirmButtonColor: "#bc2525",
      })
    handleRegister(value)
    }}>
        {({values, errors,touched, handleSubmit, handleChange, handleBlur})=>(
            <form className="form" onSubmit={handleSubmit}>
                <div >
                    <label htmlFor= "nombre">Nombre</label>
                    <input className="input" type="text" id="nombre" name="nombre" placeholder="Nombre" value={values.nombre} onChange={handleChange} onBlur={handleBlur}/>
                    {touched.nombre && errors.nombre &&<div className="error">{errors.nombre}</div>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="input"  type="text" id="email" name="email" placeholder="email@email"value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    {touched.email && errors.email &&<div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="asunto">Asunto</label>
                    <input className="input" type="text" id="asunto" name="asunto" placeholder="asunto" value={values.asunto} onChange={handleChange} onBlur={handleBlur} required/>
                </div>
                <div>
                <label htmlFor="mensaje">Mensaje</label>
                    <Field className="input" name="mensaje" as="textarea" placeholder="Mensaje" required />
                    
                </div>
                
                <button className="button" type="submit">Enviar</button>
                
                 
            </form>
        )}
    </Formik>
    <Footer/>
    </Container>
    
)
}
export default FooterForm;


//