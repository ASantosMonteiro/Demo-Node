const { User } = require('../models');

const emailExiste = async( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail){
        throw new Error(`El correo: ${ email }, ya esta registrado`);
    }
}