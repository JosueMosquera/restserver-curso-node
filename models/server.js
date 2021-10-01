const express = require("express");
const cors = require("cors");
const router = require("../routes/user");
const authpath = require("../routes/auth");
const categorypath = require("../routes/categorias");
const productospath = require("../routes/productos");
const buscarpath = require('../routes/buscar');
const { dbConnection } = require("../db/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usersRoutePath: "/api/users",
      authPath: "/api/auth",
      categorypath: "/api/categorias",
      productosPath: "/api/productos",
      buscar:"/api/buscar"
    };
    //conectar a bd
    this.conectarDb();
    //Middlewares
    this.app.use(cors());
    //Parseo y lectura del body
    this.app.use(express.json());
    this.middlewares();
    //rutas de la app
    this.routes();
  }
  async conectarDb() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.paths.authPath, authpath);
    this.app.use(this.paths.buscar, buscarpath);
    this.app.use(this.paths.usersRoutePath, router);
    this.app.use(this.paths.categorypath, categorypath);
    this.app.use(this.paths.productosPath, productospath);
  }
  listen() {
    this.app.listen(this.port);
  }
  middlewares() {
    //directorio publico
    this.app.use(express.static("public"));
  }
}
module.exports = Server;
