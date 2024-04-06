const Artist = require("../model/artist.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD

// - CONSULTAR (nos interersa tener un registro o todos los registros)

// -- UNA CANTANTE(funcion un sólo registro)
const getArtist = async (req, res, next) => {
  try {
    //1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id; //el parametro id nos lo ha tenido que pasar el usuario
    //2. BUSCO EN LA BBDD POR ID
    const artist = await Artist.findById(id); //buscamos por id, una vez tenemos el track
    //3. RESPONDO AL USUARIO
    res.status(200).json({
      //respuesta 200
      status: 200,
      message: HTTPSTATUSCODE[200],
      artist: artist, //devolvemos la track que me ha pedido
    });
  } catch (error) {
    next(error);
  }
};

// -- TODOS LOS CANTANTES
const getArtists = async (req, res, next) => {
  try {
    //2. BUSCO TODAS LOS CANTANTES
    const artist = await Artist.find(); //no nos hace falta la id, porque queremos todas
    //3. RESPONDO AL USUARIO
    res.status(200).json({
      //200 es el ok
      status: 200,
      message: HTTPSTATUSCODE[200],
      artist: artist,
    });
  } catch (error) {
    next(error);
  }
};

// - CREAR

const createArtist = async (req, res, next) => {
  //req todos los datos de una track
  try {
    //1. CREAR UNA VARIABLE (TIPO TRACK) QUE RECOJA LOS DATOS QUE ENVÍA EL USUARIO.
    const artist = new Artist(req.body);
    //2.GUARDAR EN BBDD
    await artist.save();
    //3. CONTESTAR AL USUARIO
    res.status(201).json({
      //201 codigo para creado
      status: 201,
      message: HTTPSTATUSCODE[201],
      artist: artist,
    });
  } catch (error) {
    next(error);
  }
};

// - MODIFICAR

const updateArtist = async (req, res, next) => {
  //updateTrack es cargarte el objeto antigu pero crea uno igual pero con los nuevos parametros modificados
  try {
    //1. BUSCAR EL TRACK QUE HAY QUE MODIFICAR.
    const id = req.params.id; //nos pasa el usuario una id
    //2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body; //nos lo pasa por body
    //3. ACTUALIZAR LA FUNCIÓN
    const artist = await Artist.findByIdAndUpdate(id, body, { new: true }); //.findByIdAndUpdate función de MONGO
    // 4. RESPUESTA AL USUARIO
    if (!artist) {
      return res.status(404).json({
        //404 no encontrado
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    } //else{}//esto es como hacer un if else si no encuentra lo de arriba , hace lo de abajo
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: artist,
    });
  } catch (error) {
    next(error);
  }
};

// - DELETE

const deleteArtist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findByIdAndDelete(id);

    if (!deleteArtist) {
      return res.status(404).json({ message: "Track no encontrada" }); //esto sería un mensaje de error personalizado
    } //else{}//si no existe te indica lo de abajo esto tambien es un if else

    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: artist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getArtist, getArtists, createArtist, updateArtist, deleteArtist };
