const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/generar-jwt");
const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos -correo",
      });
    }
    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos -estado:false",
      });
    }
    // verificar la pass
    const validPassword = bcrypt.compareSync(password,usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos -password",
      });
    }
    //generar el jwt
    const token = await generarJWT(usuario.id);
    res.json({
        msg:'ok',
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "algo salio mal",
    });
  }
};
module.exports = {
  login,
};
