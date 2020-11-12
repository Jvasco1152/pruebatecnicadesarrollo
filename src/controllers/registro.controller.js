const RegistroCtrl={}
const Registro=require('../models/registros.models')


RegistroCtrl.listar=async(req,res)=>{
    const administrador=await Registro.find().populate('administrador',{contrasena:0})
    res.json(administrador)
}

RegistroCtrl.listarid=async(req,res)=>{
    const id=req.params.id
    const registro=await Registro.findById({_id:id}).populate('administrador',{contrasena:0})
    res.json(registro)
}

RegistroCtrl.listarConUsuario=async(req,res)=>{
    const id=req.userid
    const registros=await Registro.find({administrador:id}).populate('administrador')
    res.json(registros)
}

RegistroCtrl.crear=async(req,res)=>{
    const{nombre,apellido,genero,nacimiento,pais,administrador}=req.body
    const nuevoregistro=new Registro({
        nombre,apellido,genero,nacimiento,pais,administrador
    })
    await nuevoregistro.save()
    res.json({
        mensaje: 'Registro Guardado'
    })
}

RegistroCtrl.eliminar=async(req,res)=>{
    const id=req.params.id
    const registroeliminar= await Registro.findById({_id:id})
    if(!registroeliminar){
        return res.json({
            mensaje: 'El registro no existe'
        })
    }
    await Registro.findByIdAndDelete({_id:id})
    res.json({
        mensaje: 'Registro Eliminado'
    })
}

RegistroCtrl.actualizar=async(req,res)=>{
    const id=req.params.id
    const registroactualizar=await Registro.findById({_id:id})
    if(!registroactualizar){
        return res.json({
            mensaje: 'El registro no existe'
        })
    }
    await Registro.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Registro Actualizado'
    })


}


module.exports=RegistroCtrl