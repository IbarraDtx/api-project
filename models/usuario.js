const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuariosSchema = new moongose.Schema ({
    username : { type: String, required: true, unique: true},
    password : { type: String,  required: true}
})

UsuariosSchema.pre('save', async function(next){
    if (this.isModified('password') || this.isNew){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

UsuariosSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports = moongose.model('Usuario', UsuariosSchema);