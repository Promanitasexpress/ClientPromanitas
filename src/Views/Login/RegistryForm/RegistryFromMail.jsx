import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import style from "./RegistryForm.module.css";
import validations from "../validations";
import Swal from "sweetalert2";
import { Image } from "cloudinary-react";

const {
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_CLOUDINARY_NAME,
} = process.env;

const RegistryFromMail = () => {
  const { user } = useAuth0();
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
    cellnumber: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  //bring info from auth0
  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        firstname: user.name,
        email: user.email,
        image: user.picture,
      }));
    }
  }, [user]);

  //add data to inputs
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validations({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
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

  //add data to DB
  const handlerSubmit = (e) => {
    e.preventDefault();
    const formDataWithImage = { ...form, image };
    try {
      axios
        .post("https://promanitasapi.onrender.com/api/v1/users", formDataWithImage, {
          Headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          Swal.fire({
            icon: "success",
            html: "Tus datos se han completado correctamente.",
            confirmButtonColor: "#bc2525",
          })
        );
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  if (!user) {
    return null;
  }

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

        </div>

        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={changeHandler}
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
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={changeHandler}
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="cellnumber">Número de teléfono:</label>
          <input
            type="tel"
            name="cellnumber"
            value={form.cellnumber}
            onChange={changeHandler}
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
          />
          {errors.address ? (
            <span className={style.error}>{errors.address}</span>
          ) : null}
        </div>

        <div>
          <button
            type="submit"
            disabled={errors.username && errors.cellnumber && errors.address}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistryFromMail;
