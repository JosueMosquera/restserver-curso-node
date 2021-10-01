const { Categoria,Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRolvalido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado en la BD`);
  }
};
const existeUsuarioID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};
const existeCategoriaID = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};
const existeProductoID = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};
//validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '',colecciones=[])=>{
  const incluida = colecciones.includes(coleccion);
  if(!incluida){
    throw new Error(`la coleccion ${coleccion} no es permitida, las colecciones permitidas son ${colecciones}`)
  }
  return true;
}
module.exports = {
  esRolvalido,
  emailExiste,
  existeUsuarioID,
  existeCategoriaID,
  coleccionesPermitidas,
  existeProductoID
};
