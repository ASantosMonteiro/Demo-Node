const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { storeRecipes, fetchRecipes } = require('../controllers/recipes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.put('',[
    validarJWT,
    validarCampos
], storeRecipes);
router.get('',[
    validarJWT,
    validarCampos
], fetchRecipes);

module.exports = router;