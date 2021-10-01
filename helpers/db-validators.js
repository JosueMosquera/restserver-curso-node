const { Categoria } = require("../models");
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
//existe categoria pista existe usuario
module.exports = {
  esRolvalido,
  emailExiste,
  existeUsuarioID,
  existeCategoriaID,
};
