const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
} = require("../controllers/users");
const {
  esRolvalido,
  emailExiste,
  existeUsuarioID,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.get("/", getUsers);
router.put(
  "/:id",
  [
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeUsuarioID),
    check("rol").custom(esRolvalido),
    validarCampos,
  ],
  putUsers
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(esRolvalido),
    validarCampos,
  ],
  postUsers
);
router.delete(
  "/:id",
  [
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeUsuarioID),
  ],
  deleteUsers
);

module.exports = router;
