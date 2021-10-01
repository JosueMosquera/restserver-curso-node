const Router = require('express');
const {check} = require('express-validator');
const {
    createProduct, getProducts, getProduct, updateProduct, deleteProduct
} = require('../controllers/productos');
const { existeProductoID } = require('../helpers');
const { validarCampos, validarJWT, esadminRol } = require('../middlewares');
const router = Router();
// ruta para crear el producto
router.post('/',[
    check('nombre','el nombre es obligatorio'),
    check('precio','el precio es obligatorio'),
    check('usuario','el id del usuario es obligatorio'),
    check('categoria','el id de categoria es obligatorio'),
    validarCampos,
    validarJWT
],createProduct);
// ruta para obtener los productos
router.get('/',getProducts);
//ruta para obtener un producto por id
router.get('/:id',[
existeProductoID
],getProduct);
//ruta para actualizar un producto por id
router.put('/:id',[
    check('nombre','el nombre es obligatorio'),
    check('precio','el precio es obligatorio'),
    check('usuario','el id del usuario es obligatorio'),
    check('categoria','el id de categoria es obligatorio'),
    validarCampos,
    validarJWT,
    existeProductoID
],updateProduct);
//ruta para poner un producto en false -> eliminar recibe id
router.delete('/:id',[
    validarJWT,
    esadminRol,
    existeProductoID
],deleteProduct);
module.exports=router