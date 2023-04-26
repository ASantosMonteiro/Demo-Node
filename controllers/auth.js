const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const signup = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = new User({ email, password })
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //Generate JWT
        const token  = await generarJWT( user.id );
        //user.expiresIn = '4h';
        //Save to DB
        await user.save();
        
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: user.expiresIn
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        if( !user ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario'
            });
        }

        const match = await bcryptjs.compare(password ,user.password);

        if (!match){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        const token  = await generarJWT( user.id );
  
        res.status(200).json({
            email: user.email,
            localId: user.localId,
            idToken: token,
            expiresIn: user.expiresIn
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    signup,
    login
}