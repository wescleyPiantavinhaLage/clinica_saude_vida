import express from "express";
const app = express()
app.use(express.json())

// importando routers 

import loginRouter from './router/loginRouter.js'
import pacientesRouter from './router/pacientesRouter.js'


// redirecionando as rotas api

app.use('/login', loginRouter)
app.use('/pacientes', pacientesRouter)


export default app