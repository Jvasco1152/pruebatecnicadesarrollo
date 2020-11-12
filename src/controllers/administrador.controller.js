const AdministradorCtrl={}
const Administrador=require('../models/administrador.models')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')



AdministradorCtrl.listar=async(req,res)=>{
    const usuario=await Administrador.find({},{contrasena:0})
    res.json(usuario)
}

AdministradorCtrl.listarid=async(req,res)=>{
    const id=req.params.id
    const usuario=await Administrador.findById({_id:id})
    res.json(usuario)
}


AdministradorCtrl.registrar=async(req,res)=>{
    const{nombre,correo,contrasena}=req.body
    const correousuario=await Administrador.findOne({correo:correo})
    if (correousuario) {
        res.json({
            mensaje: 'El correo ya existe'
        })
    }else{
        const nuevousuario=new Administrador({nombre,correo,contrasena})
        nuevousuario.contrasena=await nuevousuario.encryptarcontrasena(contrasena)
        await nuevousuario.save()
        const token=jwt.sign({_id:nuevousuario._id,nombre:nuevousuario.nombre}, 'prue')
        const usuario=await Administrador.findOne({correo:correo})
        res.json({
            mensaje: 'Bienvenido',
            id:usuario._id,
            token
        })
    }
}

AdministradorCtrl.login=async(req,res)=>{
    const {correo,contrasena}=req.body
    const usuario = await Administrador.findOne({correo:correo})
    if(!usuario){
        return res.json({
            mensaje: 'Correo/constraseña incorrecta'
        })
    } bcrypt.compare(contrasena, usuario.contrasena, function(err,resp){
        if(resp){
            const token=jwt.sign({_id:usuario._id,nombre:usuario.nombre}, 'prue')
            res.json({
                mensaje: 'Bienvenido',
                id:usuario._id,
                nombre:usuario.nombre,
                token
            })
        }else {
            return res.json({
                mensaje: 'Contraseña/correo incorrectos'
            })
        }
    })
}



module.exports=AdministradorCtrl