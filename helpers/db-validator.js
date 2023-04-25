const User = require('../models/user');

const emailExiste = async( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail){
        throw new Error(`El correo: ${ email }, ya esta registrado`);
    }
}

module.exports = {
    emailExiste
}