const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    csrfToken: { type: String } // Campo opcional para armazenar o token CSRF
});

const RegisterModel = mongoose.model("Register", RegisterSchema);
module.exports = RegisterModel;
