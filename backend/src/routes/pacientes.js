import express from 'express'
import PacienteController from '../controllers/pacienteController.js'

const pacientesRouter = express.Router()

const pacienteController = new PacienteController()

// LISTAR PACIENTES
pacientesRouter.get("/", authMiddleware, async (req, res) => {
    const { success, statusCode, body } = await pacienteController.getPacientes()
    res.status(statusCode).json({ success, statusCode, body })
})


// CRIAR PACIENTE (ADMIN ONLY)
pacientesRouter.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await pacienteController.createPaciente(req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// ATUALIZAR PACIENTE (ADMIN ONLY)
pacientesRouter.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await pacienteController.updatePaciente(req.params.id, req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// DELETAR PACIENTE (ADMIN ONLY)
pacientesRouter.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await pacienteController.deletePaciente(req.params.id)
    res.status(statusCode).json({ success, statusCode, body })
})

export default pacientesRouter