import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserId, updateUser } from "../../Redux/Actions/userAction";
import style from "./UserDetail.module.css";
import validations from "../Login/validations";
import Swal from "sweetalert2";
import { Image } from "cloudinary-react";
import axios from "axios";

const {
  REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_CLOUDINARY_NAME,
} = process.env;

const UserDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [form, setForm] = useState({
    image: "",
    password: "",
    cellnumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    image: "",
    password: "",
    cellnumber: "",
    address: "",
  });

  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const detail = useSelector((state) => state.user.userId);
  const isLoading = useSelector((state) => state.user.isLoading);

  const handleInputChange = (event) => {
    setErrors(
      validations({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = async (event, setImage) => {
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
      setUploadedImage(imageUrl);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = (event, id, form, detail, dispatch, setIsDisabled) => {
    event.preventDefault();
    const updatedForm = { ...form };
    if (uploadedImage) {
      updatedForm.image = uploadedImage;
    }
    dispatch(updateUser(id, updatedForm));
    Swal.fire({
      icon: "success",
      html: "Tus datos se han modificado correctamente.",
      confirmButtonColor: "#bc2525",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "question",
      title: "¿Deseas eliminar tu cuenta?",
      html: "Para ello por favor contacta a los administradores desde nuestro <a href='/contact'>formulario de contacto</a> y con mucho gusto te ayudarán en lo que necesites.",
      confirmButtonColor: "#bc2525",
    });
  };

  useEffect(() => {
    dispatch(getUserId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (detail) {
      setForm({
        image: detail.image || "",
        password: detail.password || "",
        cellnumber: detail.cellnumber || "",
        address: detail.address || "",
      });
    }
  }, [setForm, detail]);

  return (
    <div className={style.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={(event) => handleSave(event, id, form, detail, dispatch)}
          className={style.form}
        >
          <h2>
            {detail.firstname} {detail.lastname}
          </h2>

          {uploadedImage || detail.image || image ? (
            <img
              src={uploadedImage || image || detail.image}
              alt={detail.username}
              className={style.image}
            />
          ) : (
            <Image
              cloudName={REACT_APP_CLOUDINARY_NAME}
              publicId={detail.image}
            />
          )}
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) =>
              handleImageUpload(
                event,
                setImage,
                Swal.fire({
                  text: "Por favor espera unos segundos mientras se carga la imagen",
                  confirmButtonColor: "#bc2525",
                })
              )
            }
          />

          {detail.password ? (
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
              />
              {errors.password ? (
                <span className={style.error}>{errors.password}</span>
              ) : null}
            </div>
          ) : null}

          <label htmlFor="cellnumber">Número de teléfono:</label>
          <input
            type="text"
            name="cellnumber"
            value={form.cellnumber}
            onChange={handleInputChange}
          />
          {errors.cellnumber ? (
            <span className={style.error}>{errors.cellnumber}</span>
          ) : null}

          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
          />
          {errors.address ? (
            <span className={style.error}>{errors.address}</span>
          ) : null}

          <button
            type="submit"
            disabled={errors.password && errors.cellnumber && errors.address}
          >
            Guardar cambios
          </button>
        </form>
      )}

      <div>
        <button onClick={handleDelete} className={style.deleteButton}>
          Eliminar usuario
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
