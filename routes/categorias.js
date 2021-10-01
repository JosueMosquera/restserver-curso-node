const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categorias");
const { existeCategoriaID } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esadminRol } = require("../middlewares");
const router = Router();
//obtener todas las categorias -publico
router.get("/", getCategorys);
//obtener una categoria por id -publico
//middleware personalizado para verificar este id
router.get(
  "/:id",
  [
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeCategoriaID),
    validarCampos,
  ],
  getCategory
);
//crear nueva categoria -cualquiera con un token valido -privado
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);
//actualizar el registro por id, validaciones,middlewares -privado
router.put(
  "/:nombre",
  updateCategory
);
//Delete borrar una categoria -solo el administrador
router.delete("/:id",[
    check("id").custom(existeCategoriaID),
    validarCampos,
    esadminRol
],
deleteCategory
);

module.exports = router;
