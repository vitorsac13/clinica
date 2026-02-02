import express from 'express'
import AgendamentoController from '../controllers/medicoController.js'

const medicosRouter = express.Router()

const medicoController = new MedicoController()

medicosRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await medicoController.getMedicos()

    res.status(statusCode).send({ success, statusCode, body })
})

medicosRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await medicoController.deleteMedico(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

medicosRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await medicoController.updateMedico(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default medicosRouter