import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import agendamentosRouter from './routes/agendamentos.js'
import medicosRouter from './routes/medicos.js'
import pacientesRouter from './routes/pacientes.js'

config()

async function main () {
    const hostname = 'localhost'
    const port = 3000
    //Express
    const app = express()
    
    const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME})
    console.log(mongoConnection)
    //Inicialização
    app.use(express.json())
    app.use(cors())
    app.use(passport.initialize())

    app.get('/', (req, res) => {
        res.send({
            success: true,
            statuscode: 200,
            body: 'Welcome to Clínica!'
        })
    })

    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/agendamento', agendamentosRouter)
    app.use('/medico', medicosRouter)
    app.use('/paciente', pacientesRouter)

    app.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`)
    })
}

main ()