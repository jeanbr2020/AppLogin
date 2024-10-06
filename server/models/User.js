const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
}, {
    timestamps: true // Adiciona timestamps de criação e atualização
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
