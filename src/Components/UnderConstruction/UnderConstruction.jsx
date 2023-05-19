import Logo from "./../../Images/icon.png"
import { Link } from "react-router-dom";
import style from "./UnderConstruction.module.css";




const UnderConstruction = () => {
  return (
    <div className={style.container}>
      
      <div>
        <img className={style.Logo} src={Logo} alt="" />
      </div>
      <div>
        <h1 className={style.title}>Sitio en construcción</h1>
      </div>
      <div>
        <h3 className={style.title}>
          Lamentamos los inconvenientes, pronto podrás ver el sitio en línea
        </h3>
      </div>
      <div>
        <Link className={style.title} to="/home">
          <h4 >Regresa a Home</h4>
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
