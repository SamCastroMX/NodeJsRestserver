const {Router} = require('express');
const {check} = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.post('/login', [
    check('correo','Correo es obligatorio').isEmail(),
    check('password','Contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login) 

router.post('/google', [
    check('id_token','Id_token es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn) 

module.exports = router;