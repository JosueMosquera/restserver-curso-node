const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { login } = require("./auth");

const getUsers = async(req = request, res = response) => {
  //const { name = "no name", apellido } = req.query;
  const{limite=5,desde=0} = req.query;
  const query = {estado:true};
  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);
  res.json({
    total,
  usuarios});
};
const postUsers = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //verificar si el correo existe
  //encryptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password=bcryptjs.hashSync(password,salt)
  //guardar en la bd
  await usuario.save();
  res.json({
    usuario,
  });
};
const putUsers = async(req, res = response) => {
  const { id } = req.params;
  const {_id,password, google,correo, ...resto } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id,resto);
  res.json(usuario);
};
const deleteUsers = async(req, res = response) => {
  const{id} = req.params;
  // fisicamente lo borramos
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
  res.json({usuario});
};
module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
