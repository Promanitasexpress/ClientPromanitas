// const stringRegExp = /^[a-zA-Z0-9 ]+$/
// const numberRegExp = /^([1-5])$/
const emailRegExp = /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){1,20}$/
const nameRegExp = /^[a-zA-Z ]*$/
const cellnumberRegExp = /^[0-9]*$/
const imageRegExp = /^.+\.(png|jpe?g|gif)$/i




const espaciosRegExp = /^\s/


const validations = (form) => {
    const errors = {}

    if(!form.username) {
        errors.username = "El nombre de usuario es un campo requerido"
    } else if (form.username.length < 5) {
        errors.username = "El nombre de usuario debe tener minimo 5 caracteres"
    } else if (espaciosRegExp.test(form.username)){
        errors.username = "El nombre de usuario no puede contener espacios"
    } else if (form.username.length > 15){
        errors.username = "El nombre de usuario no tener más de 15 caracteres"
    }

    if(!form.firstname) {
        errors.firstname = "El nombre es un campo requerido"
    } else if(!nameRegExp.test(form.firstname)){
        errors.firstname = "El nombre sólo puede contener letras"
    }

    if(!form.lastname) {
        errors.lastname = "El apellido es un campo requerido"
    } else if (!nameRegExp.test(form.lastname)){
        errors.lastname = "El apellido sólo puede contener letras"
    } 

    if(!form.email) {
        errors.email = "El correo electrónico es un campo requerido"
    } else if (!emailRegExp.test(form.email)){
        errors.email = "El correo electronico suministrado no es válido"
    }

    if(!form.password) {
        errors.password = "La contraseña es un campo requerido"
    } else if (form.password.length < 8 || form.password.length > 20){
        errors.password = "La contraseña debe tener entre 8 y 20 caracteres"
    } else if (!passwordRegExp.test(form.password)){
        errors.password = "La contraseña debe tener al menos 1 caracter especial y una letra mayúscula"
    } 

    if(!form.cellnumber) {
        errors.cellnumber = "El número de teléfono es un campo requerido"
    } else if (form.cellnumber.length < 9) {
        errors.cellnumber = "El numero de teléfono suministrado es inválido"
    } else if(!cellnumberRegExp.test(form.cellnumber)){
        errors.cellnumber = "El número de teléfono no puede contener letras"
    } else if(form.cellnumber.length > 14){
        errors.cellnumber = "El número de teléfono no pueder ser mayor a 14 digítos"
    }

    if(!form.address) {
        errors.address = "La dirección es un campo requerido"
    } 

    if(!imageRegExp.test(form.image)) {
        errors.image = "La URL de la imagen suministrada debe ser un formato válido (jpg, png, jpeg)"
    }
    return errors;
}

export default validations;