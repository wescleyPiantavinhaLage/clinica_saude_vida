import express from "express";
const app = express()
app.use(express.json())

// importando routers 

import loginRouter from './router/loginRouter.js'
import usuarioRouter from './router/usuarioRouter.js'



// redirecionando as rotas api

app.use('/login', loginRouter)
app.use('/usuarios', usuarioRouter)


export default app