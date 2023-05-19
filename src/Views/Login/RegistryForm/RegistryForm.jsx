import React, { useState } from "react";
import axios from "axios";
import style from "./RegistryForm.module.css";
import { useNavigate } from "react-router";
import validations from "../validations";
import Swal from "sweetalert2";
import { Image } from "cloudinary-react";

const {
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_CLOUDINARY_NAME,
} = process.env;

const RegistryForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cellnumber: "",
    address: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cellnumber: "",
    address: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  //add data to inputs
  const changeHandler = (event) => {
    setErrors(
      validations({ ...form, [event.target.name]: event.target.value })
    );
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await axios.post(REACT_APP_CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.secure_url;
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = { ...form, image };

    try {
      axios
        .post(
          "https://promanitasapi.onrender.com/api/v1/users",
          formDataWithImage,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          Swal.fire({
            icon: "success",
            title: "Usuario creado correctamente",
            html: "Por favor inicia sesión para continuar.",
            confirmButtonColor: "#bc2525",
          })
        );
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handlerSubmit(e)} className={style.form}>
        <div>
          {image && (
            <Image cloudName={REACT_APP_CLOUDINARY_NAME} publicId={image} />
          )}

          <label htmlFor="image">Imagen</label>

          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
          />

          {/* {errors.image ? (
              <span className={style.error}>{errors.image}</span>
            ) : null} */}
        </div>

        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={changeHandler}
            required
          />
          {errors.username ? (
            <span className={style.error}>{errors.username}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="firstname">Nombre:</label>
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={changeHandler}
            required
          />
          {errors.firstname ? (
            <span className={style.error}>{errors.firstname}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={changeHandler}
            required
          />
          {errors.lastname ? (
            <span className={style.error}>{errors.lastname}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={changeHandler}
            required
          />
          {errors.email ? (
            <span className={style.error}>{errors.email}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={changeHandler}
            required
          />
          {errors.password ? (
            <span className={style.error}>{errors.password}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="cellnumber">Número de teléfono:</label>
          <input
            type="tel"
            name="cellnumber"
            value={form.cellnumber}
            onChange={changeHandler}
            required
          />
          {errors.cellnumber ? (
            <span className={style.error}>{errors.cellnumber}</span>
          ) : null}
        </div>

        <div>
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={changeHandler}
            required
          />
          {errors.address ? (
            <span className={style.error}>{errors.address}</span>
          ) : null}
        </div>

        <div>
          <button
            type="submit"
            disabled={
              errors.username &&
              errors.firstname &&
              errors.lastname &&
              errors.email &&
              errors.password &&
              errors.cellnumber &&
              errors.address 
            }
          >
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistryForm;
