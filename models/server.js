
const express = require('express');

const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Connect to DB
        this.conectarDB();
        
        //Middlewears
        this.middlewears();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth')) 
        this.app.use(this.usuariosPath, require('../routes/user')) 
    }

    listen(){
        this.app.listen(this.port )
    }
}

module.exports = Server;