const { Router } = require('express');
const { check } = require('express-validator'); 
const { signup, login } = require("../controllers/auth");
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste } = require('../helpers/db-validator');

const router = Router();

router.post('/signup',[
    check('email','El email es obligatorio').isEmail(),
    check('email').custom( emailExiste ),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min: 6}),
    validarCampos
], signup);
    
router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min: 6}),
    validarCampos
], login);

module.exports = router;
