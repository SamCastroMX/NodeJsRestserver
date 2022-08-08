const path = require('path');

const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        //console.log('req.files >>>', req.files); // eslint-disable-line
        let sampleFile;
        let uploadPath;

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const ext = nombreCortado[nombreCortado.length - 1];

        //Validar Ext    
        if (!extensionesValidas.includes(ext)) {
            return reject(`La extrension ${ext} no es permitida, ${extensionesValidas}`);
        }


        const nombreTemp = uuidv4() + '.' + ext;

        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });

    }

    )
};



module.exports = {
    subirArchivo
}