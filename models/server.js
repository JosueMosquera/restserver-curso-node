const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const authpath =require('../routes/auth')
const { dbConnection } = require('../db/config');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath='/api/users';
        this.authPath = '/api/auth';
        //conectar a bd
        this.conectarDb();
        //Middlewares
        this.app.use(cors())
        //Parseo y lectura del body
        this.app.use(express.json());
        this.middlewares();
        //rutas de la app
        this.routes();
    }
    async conectarDb(){
        await dbConnection();
    }
    routes(){
        this.app.use(this.authPath,authpath);
        this.app.use(this.usersRoutePath,router)
    }
    listen(){
        this.app.listen(this.port);
    }
    middlewares(){
        //directorio publico
        this.app.use(express.static('public'));
    }
}
module.exports = Server;