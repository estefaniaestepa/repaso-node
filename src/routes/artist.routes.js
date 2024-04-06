const express = require('express');
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const artistRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const { getArtist, getArtists, createArtist, updateArtist, deleteArtist } = require('../controller/artist.controller');

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANTANTE
artistRouter.get('/:id', getArtist);

//OBTENER TODOS LOS CANTANTES
artistRouter.get('/', getArtists);

//CREAR UNA CANTANTE
artistRouter.post('/', createArtist);

//UPDATE
artistRouter.patch('/:id', updateArtist);

//DELETE
artistRouter.delete('/:id', deleteArtist);


module.exports = artistRouter;