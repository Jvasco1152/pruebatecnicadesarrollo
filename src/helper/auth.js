const Auth={}
const jwt=require('jsonwebtoken')

Auth.verificartoken=(req,res,next)=>{
    if(!req.headers.autorizacion){
        return res.json({
            mensaje: 'No estas autorizado'
        })
    }
    const token=req.headers.autorizacion.split(' ')[1]
    if(token==='null'){
        return res.json({
            mensaje: 'No estas autorizado'
        })
    }
    const payload=jwt.verify(token, 'prue')
    req.userid=payload._id
    next()
}

module.exports=Auth