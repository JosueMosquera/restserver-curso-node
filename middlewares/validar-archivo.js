const validarArchivo = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ msg: "No hay archivos que subir -middleware." });
  }
  next();
};
module.exports = {
  validarArchivo,
};
