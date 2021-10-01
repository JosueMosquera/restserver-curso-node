const { Schema, model } = require("mongoose");
const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  precio: {
    type: Number,
    default: 0,
    required:'true'
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  }
});
ProductoSchema.methods.toJSON = function () {
  const { __v, estado, _id, ...producto } = this.toObject();
  producto.uid = _id;
  return producto;
};
module.exports = model("Producto", ProductoSchema);
//opcional crear index para poner todos los modelos