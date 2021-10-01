const { response, request } = require("express");
const { Categoria } = require("../models");
const categoria = require("../models/categoria");

//obtener categorias -paginado -total -populate
const getCategorys = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total,categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).populate('usuario','nombre correo')
    .skip(Number(desde))
    .limit(Number(limite))
  ])
  /*
  const count = await Categoria.count({estado:true});
  const categorys = await Categoria.find(query)
    .populate({ path: "usuario", select: "correo nombre" })
    .skip(Number(desde))
    .limit(Number(limite));
    */
  res.json({
    total,
    categorias

    //usuario:usuario,
    //uid_usuario:uid
  });
};
// obtener categoria -populate
const getCategory = async (req = request, res) => {
  const { id } = req.params;
  const category = await Categoria.findById(id).populate({
    path: "usuario",
    select: "correo nombre",
  });
  res.json({
    category: category,
  });
};
// actualizar categoria -recibir nombre
const updateCategory = async (req = request, res) => {
  const nombreCategoria = req.params.nombre.toUpperCase();
  const { nombre } = req.body;
  const nombreUp=nombre.toUpperCase()
  const categoriaNombre = await Categoria.findOne({nombre:nombreCategoria}).updateOne({nombre:nombreUp});

  res.json({
    categoria:categoriaNombre
  });
};
//borrar categoria -estado:false -id necesitamos verificar
const deleteCategory= async(req=request,res)=>{
    const {id} = req.params
    const CategoryDelete = await Categoria.findById(id).updateOne({estado:false})
    res.json({
        result:CategoryDelete
    })
}
const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    res.status(400).json({
      msg: `la categoria ${categoriaDB.nombre} ya existe en la DB`,
    });
  }
  //generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };
  const categoria = await new Categoria(data);
  //guardar db
  await categoria.save();
  res.status(201).json(categoria);
};
module.exports = {
  crearCategoria,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory
};
