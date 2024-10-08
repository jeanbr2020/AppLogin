const mongoose = require('mongoose');

// Define o esquema do usuário
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
}, {
    timestamps: true // Adiciona timestamps automáticos para createdAt e updatedAt
});

// Método para formatar as datas antes de enviar para o frontend
UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    user.createdAt = new Date(user.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    user.updatedAt = new Date(user.updatedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    return user;
};

// Cria o modelo User a partir do esquema
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
