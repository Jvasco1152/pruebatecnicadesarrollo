const {Router} = require('express')
const router = Router()
const AdministradorCtrl=require('../controllers/administrador.controller')

router.get('/admin', AdministradorCtrl.listar)
router.get('/admin/:id', AdministradorCtrl.listarid)
router.post('/admin/registrar', AdministradorCtrl.registrar)
router.post('/admin/login', AdministradorCtrl.login)



module.exports=router