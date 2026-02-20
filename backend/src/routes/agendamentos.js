import express from 'express'
import AgendamentoController from '../controllers/agendamentoController.js'

const agendamentosRouter = express.Router()

const agendamentoController = new AgendamentoController()

agendamentosRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await agendamentoController.getAgendamentos()

    res.status(statusCode).send({ success, statusCode, body })
})

agendamentosRouter.get('/my', async (req, res) => {
    const { success, statusCode, body } =
        await agendamentoController.getMyAgendamentos(req.user)

    res.status(statusCode).send({ success, statusCode, body })
})

agendamentosRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await agendamentoController.deleteAgendamento(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

agendamentosRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await agendamentoController.updateAgendamento(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default agendamentosRouter