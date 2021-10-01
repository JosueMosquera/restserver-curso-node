const { request, response } = require("express");
const Producto = require("../models/producto");

// crear producto !nice
const createProduct = async (req = request, res = response) => {
  const {
    nombre,
    estado,
    usuario,
    precio,
    categoria,
    descripcion,
    disponible,
  } = req.body;
  const nombreUp = nombre.toUpperCase();
  const data = {
    nombre:nombreUp,
    estado,
    precio,
    descripcion,
    disponible,
    usuario,
    categoria
  };
  const existeProducto = await Producto.findOne({nombre:nombreUp})
  if(existeProducto){
    res.status(400).json({
        msg:`el producto ${nombreUp} ya existe en la BD`
    })
  }
  else{
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json({
      producto: producto,
    });
  }
};
//get productos !nice
const getProducts = async (req, res) => {
  const { limite = 5, desde = 0 } = req.params;
  const query = { estado: true };
  const total = await Producto.count(query);
  const productos = await Producto.find(query)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre")
    .skip(desde)
    .limit(limite);
  res.json({
    total_productos: total,
    productos: productos,
  });
};
// get producto por id !nice
const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  if (!product) {
    res.status(400).json({
      msg: `error el producto con id ${id} no existe en la BD`,
    });
  } else {
    res.json({
      producto: product
    });
  }
};
//actualizar producto por id !nice
const updateProduct = async(req,res)=>{
    const {id} = req.params
    const {nombre,estado,usuario,precio,categoria,descripcion,disponible} = req.body;
    const nombreUp = nombre.toUpperCase();
    const data = {
        nombre:nombreUp,
        estado:estado,
        precio:precio,
        descripcion:descripcion,
        disponible:disponible,
        usuario:usuario,
        categoria:categoria
    }
    const productUpdate = await Producto.findByIdAndUpdate(id,data).populate('usuario','nombre').populate('categoria','nombre')
    res.json({
        productoActualizado:productUpdate
    })
}
// delete product estado=false !nice
const deleteProduct = async(req,res)=>{
    const {id} = req.params
    const data = {
        estado:false
    }
    const deletedProduct = await Producto.findByIdAndUpdate(id,data)
    res.json({
        deletedProduct_estado_false: deletedProduct
    })
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
