const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    csrfToken: { type: String } // Campo opcional para armazenar o token CSRF
});

const LoginModel = mongoose.model("Login", LoginSchema);
module.exports = LoginModel;
