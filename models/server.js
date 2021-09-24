const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath='/api/users'
        //Middlewares
        this.app.use(cors())
        //Parseo y lectura del body
        this.app.use(express.json());
        this.middlewares();
        //rutas de la app
        this.routes();
    }
    routes(){
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