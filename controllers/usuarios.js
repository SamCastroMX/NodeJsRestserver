const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const params=req.query;
    res.send({
        msg:"get API - controlador",
        params
    })
  }

  const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.send({
        msg:"post API - controlador",
        body
    })
  }

  const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.send({
        msg:"put API - controlador",
        id
    })
  }

  const usuariosPatch = (req, res = response) => {
    res.send({
        msg:"patch API - controlador"
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.send({
        msg:"delete API - controlador"
    })
  }

  

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }