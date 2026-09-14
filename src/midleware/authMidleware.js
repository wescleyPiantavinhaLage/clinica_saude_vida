export function autenticar(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'token não informado!' })
    }

    const partes = authHeader.split(' ')

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ mensagem: 'token mal formatado!' })
    }

    const token = partes[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = payload
        return next()
    } catch (erro) {
        if (erro.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'sessão expirada, faça login novamente!' })
        }
        return res.status(401).json({ mensagem: 'token inválido!' })
    }
}