import Router from 'express'
const router = Router()
import { autorizar } from '../midleware/autoMidleware.js'
import { autenticar } from '../midleware/authMidleware.js'


import * as pacientesController from '../controller/pacientesController.js'

router.get('/', autenticar ,autorizar(1), pacientesController.buscarTudo)

export default router