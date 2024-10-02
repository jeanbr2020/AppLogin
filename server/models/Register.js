const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    csrfToken: String // Novo campo para armazenar o token CSRF
})

const RegisterModel = mongoose.model("register", RegisterSchema)
module.exports = RegisterModel