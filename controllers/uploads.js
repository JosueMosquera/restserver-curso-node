const { response } = require("express");
const { subirArchivo } = require("../helpers");
const {Usuario,Producto} = require('../models');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)
const  path  = require('path');
const fs = require('fs')
const cargarArchivo = async (req, res = response) => {
  if (!req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir." });
    return;
  }
  //imagenes arreglo por defecto
  try {
    // textos const archivo = await subirArchivo(req.files,['txt'],'textos');
    const archivo = await subirArchivo(req.files, undefined, "imgs");
    res.json({
      archivo,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
  //console.log('req.files >>>', req.files); // eslint-disable-line
};
const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un usuario con el id ${id}`
        })
      }
      break;
    case "productos":
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
  }
  //limpiar imagenes previas
  try {
      if(modelo.img){
        // hay que borrar la imagen del servidor necesito el path
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
          fs.unlinkSync(pathImagen)
        }
      }
  } catch (error) {
    return res.status(400).json(error)
  }
  modelo.img=await subirArchivo(req.files,undefined,coleccion)
  await modelo.save()
  res.json(modelo);
};
const mostrarImagen = async(req,res)=>{
  const  {id,coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un usuario con el id ${id}`
        })
      }
      break;
    case "productos":
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
  }
  //verificar si tiene la imagen
  try {
      if(modelo.img){
        // el path de la imagen es el siguiente
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
          res.sendFile(pathImagen)
        }
      }
      else{
        const noImage = path.join(__dirname,'../assets','no-image.jpg')
        res.sendFile(noImage)
      }
  } catch (error) {
    return res.status(400).json(error)
  }
}
const actualizarImagenCloudinary = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un usuario con el id ${id}`
        })
      }
      break;
    case "productos":
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({
          msg:`no existe un producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
  }
  //limpiar imagenes previas
    if(modelo.img){
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length-1]
      const [public_id] = nombre.split('.');
       cloudinary.uploader.destroy(public_id)
    }
      
  const{tempFilePath} = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
  modelo.img= secure_url;
  await modelo.save();
  res.json(modelo)
};
module.exports = { cargarArchivo, actualizarImagen,mostrarImagen,actualizarImagenCloudinary };
