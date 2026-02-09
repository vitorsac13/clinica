import express from 'express'
import AgendamentoController from '../controllers/pacienteController.js'

const pacientesRouter = express.Router()

const pacienteController = new PacienteController()

pacientesRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await pacienteController.getPacientes()

    res.status(statusCode).send({ success, statusCode, body })
})

pacientesRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await pacienteController.deletePaciente(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

pacientesRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await pacienteController.updatePaciente(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default pacientesRouter