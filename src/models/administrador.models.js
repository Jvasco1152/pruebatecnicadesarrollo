const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')



const AdministradorSchema=new Schema({
    nombre:String,
    correo:String,
    contrasena:String,
},{
    timestamps: true
})

AdministradorSchema.methods.encryptarcontrasena=async contrasena=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contrasena, salt)
}

module.exports=mongoose.model('administrador', AdministradorSchema)