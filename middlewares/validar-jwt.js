const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async(req = request, res = response, next ) => {

    const token = req.query.token;
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {

        const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById( uid );

        if (!user){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        req.authUser = user;
        
        next();

    } catch(error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}