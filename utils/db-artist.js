const mongoose = require('mongoose');

const pass = 'mongodb+srv://estefaniaestepa:Gabriel301092@estefania.plnux76.mongodb.net/music?retryWrites=true&w=majority&appName=estefania'

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(pass);
    console.log('INFO: Conexión a BD correcta:', conn.connection.name)
  } catch (error) {
    console.log('ERROR: (f connectMongo) ->', error.message);
  }
}
module.exports = { connectMongo };