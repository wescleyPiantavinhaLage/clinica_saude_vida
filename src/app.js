import express from "express";
const app = express()
app.use(express.json())

// importando routers 

import loginRouter from './router/loginRouter.js'


// redirecionando as rotas api

app.use('/login', loginRouter)


export default app