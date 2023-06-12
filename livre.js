const mongoose = require("mongoose")
const LivreSchema = mongoose.Schema({
    numero: String,
    category: String,
    nom: String,
    description: String,
    prix: String,

});
module.exports = mongoose.model('livre', LivreSchema)
