const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads");
const { validarCampos,validarArchivo } = require("../middlewares");
const {coleccionesPermitidas} = require('../helpers/db-validators');
const router = Router();
router.post('/',[validarArchivo],cargarArchivo);
router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)//actualizarImagen
router.get('/:coleccion/:id',[
    check('id','el id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)

module.exports=router;