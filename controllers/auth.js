const { response, json } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
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
const googleSignIn = async(req,res=response) =>{
  const{id_token} = req.body;
  try {
    const {nombre,img,correo} = await googleVerify(id_token);
    let usuario= await Usuario.findOne({correo});
    if(!usuario){
      // tengo que crearlo
      const data={
        nombre:nombre,
        correo:correo,
        password:'es parte del metodo de google',
        img:img,
        rol:'USER_ROLE',
        google:true
      }
      usuario=new Usuario(data);
      await usuario.save();
    }
    //si el usuario en DB tiene estado false en google
    if(!usuario.estado){
      return res.status(401).json({
        msg:'hable con el admin, usuario bloqueado -estado false'
      })
    }
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:'el token no se pudo verificar'
    })
  }

}
module.exports = {
  login,
  googleSignIn
};
