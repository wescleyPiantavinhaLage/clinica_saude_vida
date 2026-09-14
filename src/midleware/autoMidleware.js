export function autorizar(...tiposPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ mensagem: 'usuário não autenticado!' })
        }

        if (!tiposPermitidos.includes(req.usuario.tipo)) {
            return res.status(403).json({ mensagem: 'você não tem permissão para acessar este recurso!' })
        }

        return next()
    }
}