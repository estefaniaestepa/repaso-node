const Track = require("../model/artist.model");
//const Contributor = require("../model/contributor.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD

// - CONSULTAR (nos interersa tener un registro o todos los registros)

// -- UNA CANCION (funcion un sólo registro)
const getTrack = async (req, res, next) => {
  try {
    //1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id; //el parametro id nos lo ha tenido que pasar el usuario
    //2. BUSCO EN LA BBDD POR ID
    const track = await Track.findById(id).populate('contributors'); //buscamos por id, una vez tenemos el track
    //3. RESPONDO AL USUARIO
    res.status(200).json({
      //respuesta 200
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track, //devolvemos la track que me ha pedido
    });
  } catch (error) {
    next(error);
  }
};

// -- TODAS LAS CANCIONES (todas las track)
const getTracks = async (req, res, next) => {
  try {
    //2. BUSCO TODAS LAS TRACKS
    const tracks = await Track.find().populate('contributors'); //no nos hace falta la id, porque queremos todas
    //3. RESPONDO AL USUARIO
    res.status(200).json({
      //200 es el ok
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// - CREAR

const createTrack = async (req, res, next) => {
  //req todos los datos de una track
  try {
    //1. CREAR UNA VARIABLE (TIPO TRACK) QUE RECOJA LOS DATOS QUE ENVÍA EL USUARIO.
    const track = new Track(req.body);
    //2.GUARDAR EN BBDD
    await track.save();
    //3. CONTESTAR AL USUARIO
    res.status(201).json({
      //201 codigo para creado
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// - MODIFICAR

const updateTrack = async (req, res, next) => {
  //updateTrack es cargarte el objeto antigu pero crea uno igual pero con los nuevos parametros modificados
  try {
    //1. BUSCAR EL TRACK QUE HAY QUE MODIFICAR.
    const id = req.params.id; //nos pasa el usuario una id
    //2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body; //nos lo pasa por body
    //3. ACTUALIZAR LA FUNCIÓN
    const track = await Track.findByIdAndUpdate(id, body, { new: true }); //.findByIdAndUpdate función de MONGO
    // 4. RESPUESTA AL USUARIO
    if (!track) {
      return res.status(404).json({
        //404 no encontrado
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    } //else{}//esto es como hacer un if else si no encuentra lo de arriba , hace lo de abajo
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// - DELETE

const deleteTrack = async (req, res, next) => {
  try {
    const id = req.params.id;
    const track = await Track.findByIdAndDelete(id);

    if (!track) {
      return res.status(404).json({ message: "Track no encontrada" }); //esto sería un mensaje de error personalizado
    } //else{}//si no existe te indica lo de abajo esto tambien es un if else

    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrack, getTracks, createTrack, updateTrack, deleteTrack };
