const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const {name='no name',apellido}= req.query;
  res.json({
    msg: "get api- controlador",
    name,
    apellido
  });
};
const postUsers = (req, res = response) => {
  const { Nombre, edad } = req.body;
  res.json({
    msg: "post api-controlador",
    Nombre,
    edad,
  });
};
const putUsers = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put api-controlador",
    id,
  });
};
const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete api-controlador",
  });
};
module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
