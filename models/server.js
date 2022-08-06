
const express = require('express');

const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuariosPath : '/api/usuarios',
            authPath : '/api/auth',
            categoriasPath : '/api/categorias',
            productosPath: '/api/productos',
            buscarPath: '/api/buscar'
        };

        

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
        this.app.use(this.paths.authPath, require('../routes/auth')) 
        this.app.use(this.paths.usuariosPath, require('../routes/user')) 
        this.app.use(this.paths.categoriasPath, require('../routes/categorias')) 
        this.app.use(this.paths.productosPath, require('../routes/productos')) 
        this.app.use(this.paths.buscarPath, require('../routes/buscar')) 
        
        
    }

    listen(){
        this.app.listen(this.port )
    }
}

module.exports = Server;