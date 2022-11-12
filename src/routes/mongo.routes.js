import { Router } from 'express'
import mongoCtrl from '../controllers/mongo.controller.js'

const route=Router()

route.get('/',mongoCtrl.listar)
route.get('/:id',mongoCtrl.listarPorId)

route.post('/',mongoCtrl.crear)
route.delete('/:id',mongoCtrl.eliminar)
route.put('/:id',mongoCtrl.actualizar)

export default route