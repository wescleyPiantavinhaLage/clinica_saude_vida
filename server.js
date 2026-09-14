import express from 'express'
import path from 'path'
import app from './src/app.js'
import { fileURLToPath } from 'url'
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// deixando a pasta public publica

app.use(express.static(path.join(__dirname, 'public')))

// configurando rotas html

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'src' , 'view' , 'login.html')))
app.get('/consulta', (req, res) => res.sendFile(path.join(__dirname, 'src' , 'view' , 'consulta.html')))
app.get('/atendimento', (req, res) => res.sendFile(path.join(__dirname, 'src' , 'view' , 'atendimento.html')))
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'src' , 'view' , 'dashboard.html')))





const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando em localhost na porta: ${PORT}`)
})