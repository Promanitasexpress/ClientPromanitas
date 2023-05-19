const validations = (form) => {
    const errors = {}

    if(!form.name) {
        errors.name = "El título del aviso es un campo requerido"
    } else if (form.name.length < 5) {
        errors.name = "El título del aviso debe tener mínimo 5 caracteres"
    } else if (form.name.length > 20){
        errors.name = "El título del aviso no tener más de 20 caracteres"
    }

    if(!form.image) {
        errors.image = "Por favor incluye una imagen válida"
    }

    if(!form.service) {
        errors.service = "Debes elegír el rubro en el que deseas desempeñarte"
    } 

    if(!form.description) {
        errors.description = "La descripción de tu oficio es un campo requerido"
    } 

    return errors;
}

export default validations;