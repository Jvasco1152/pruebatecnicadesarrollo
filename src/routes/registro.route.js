const {Router} = require('express')
const router = Router()
const RegistroCtrl=require('../controllers/registro.controller')
const auth=require('../helper/auth')

router.get('/registro',auth.verificartoken, RegistroCtrl.listar)
router.get('/registro/:id',auth.verificartoken, RegistroCtrl.listarid)
router.get('/registrousuario',auth.verificartoken, RegistroCtrl.listarConUsuario)
router.post('/registro/crear',auth.verificartoken, RegistroCtrl.crear)
router.delete('/registro/eliminar/:id',auth.verificartoken, RegistroCtrl.eliminar)
router.put('/registro/actualizar/:id',auth.verificartoken, RegistroCtrl.actualizar)



module.exports=router