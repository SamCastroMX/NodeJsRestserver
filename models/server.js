
const express = require('express');

const cors = require('cors')
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //Middlewears
        this.middlewears();

        //Rutas
        this.routes();
    }

    middlewears(){
        //Directorio publico
        this.app.use(express.static('public'))

        //CORS
        this.app.use(cors());

        //Lectura y Parseo
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/app/usuarios', require('../routes/user')) 
    }

    listen(){
        this.app.listen(this.port )
    }
}

module.exports = Server;