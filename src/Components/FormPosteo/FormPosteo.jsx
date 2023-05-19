import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import validations from "./validations";
import Swal from "sweetalert2";
import { Image } from "cloudinary-react";
import { getName } from "../../Redux/Actions/newPostActions";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsers } from "../../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import "./FormPosteoStyle.css";
import { Link } from "react-router-dom";

const {
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_CLOUDINARY_NAME,
} = process.env;

const FormPosteo = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    service: [],
    description: "",
    name: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    service: [],
    description: "",
    name: "",
    image: "",
  });

  const [image, setImage] = useState(null);
  useEffect(() => {
    dispatch(getName());
    dispatch(getAllUsers());
  }, [dispatch]);

  const posts = useSelector((state) => state.service.names);

  const usersDb = useSelector((state) => state.user.allUsers);
  const filteredUser = usersDb.filter((elem) => elem.email === user.email);

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

  const handlerSelect = (event) => {
    setForm({
      ...form,
      service: [...form.service, event.target.value],
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
        .post("/adPosts", formDataWithImage, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          Swal.fire({
            icon: "success",
            html: "Tu aviso se ha publicado correctamente",
            confirmButtonColor: "#bc2525",
          })
        );
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handlerSubmit} className="form">
        <div>
          <div>
            <select name="service" onChange={(event) => handlerSelect(event)}>
              <option value="select">Seleccione un rubro</option>
              {posts?.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name">Título</label>
            <input
              className="input"
              name="name"
              placeholder="Texto"
              onChange={changeHandler}
            />
            {errors.name ? <span className="error">{errors.name}</span> : null}
          </div>

          
            <div>
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={changeHandler}
                
              />
            </div>
          

          <div>
            {image && (
              <Image cloudName={REACT_APP_CLOUDINARY_NAME} publicId={image} />
            )}
            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              className="input"
              accept="image/*"
            />
            {/* {errors.image ? (
              <span className="error">{errors.image}</span>
            ) : null} */}
          </div>

          <label htmlFor="description">Descripción</label>
          <input
            className="input"
            name="description"
            as="textarea"
            placeholder="Description"
            onChange={changeHandler}
          />
          {errors.description ? (
            <span className="error">{errors.description}</span>
          ) : null}
        </div>

        {filteredUser[0] && filteredUser[0].email ? (
          <div>
            <button type="submit" disabled={errors.name && errors.description}>
              Publicar
            </button>
          </div>
        ) : (
          <div>
            <p>
              ¡Por favor completa tus datos desde <Link to="/profile">tu perfil de usuario</Link> para poder publicar
              avisos!
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormPosteo;
