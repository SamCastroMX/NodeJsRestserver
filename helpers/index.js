const dbValidators = require('./db-validators');
const generarJWT = require('./generar-JWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports= {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}