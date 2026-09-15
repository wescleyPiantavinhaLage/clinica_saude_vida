import Router from 'express'
const router = Router()


import * as usuarioController from '../controller/usuarioController.js'

router.get('/buscarTiposUsuario', usuarioController.buscarTiposUsuario)
router.get('/buscarTudoAtuacoes', usuarioController.buscarTudoAtuacoes)
router.get('/buscarTudoUsuarios', usuarioController.buscarTudoUsuarios)
router.post('/', usuarioController.cadastrar)
router.put('/:id', usuarioController.atualizar)
router.delete('/:id', usuarioController.deletar)

export default router