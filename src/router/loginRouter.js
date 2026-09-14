import Router from 'express'
const router = Router()


import * as loginController from '../controller/loginController.js'

router.post('/', loginController.verificarUsuario)

export default router