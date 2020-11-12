const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')
const { schema } = require('./administrador.models')



const RegistrosSchema=new Schema({
    nombre:String,
    apellido:String,
    genero:String,
    nacimiento: Date,
    pais:String,
    administrador:{type:Schema.Types.ObjectId,ref:'administrador'},
},{
    timestamps: true
})


module.exports=mongoose.model('registro',RegistrosSchema);
