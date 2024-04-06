//el policia tiene que hacer algo a quien parar y a quien no parar, esto serán los usuarios
//policia middleware

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10; //cuanta complejidad le tienes que dar a esa contraseña, el 10 es el nº de caracteres de complejidad

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },
    password: { type: String, trim: true, required: true }
  }
);

userSchema.pre("save", (next) => {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, salt); // esto es para que los pasworts se encripten (bcrypt libreria de encriptar)
  }
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;