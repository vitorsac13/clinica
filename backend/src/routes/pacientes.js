import express from 'express'
import PacienteController from '../controllers/pacienteController.js'
import authMiddleware from "../helpers/authMiddleware.js"
import adminMiddleware from "../helpers/adminMiddleware.js"

const pacientesRouter = express.Router()

const pacienteController = new PacienteController()

// LISTAR PACIENTES
pacientesRouter.get("/", authMiddleware, async (req, res) => {
    const { success, statusCode, body } = await pacienteController.getPacientes()
    res.status(statusCode).json({ success, statusCode, body })
})


// CRIAR PACIENTE
pacientesRouter.post("/", async (req, res) => {
    const { success, statusCode, body } = await pacienteController.createPaciente(req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// ATUALIZAR PACIENTE 
pacientesRouter.put("/:id", async (req, res) => {
    const { success, statusCode, body } = await pacienteController.updatePaciente(req.params.id, req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// DELETAR PACIENTE
pacientesRouter.delete("/:id", async (req, res) => {
    const { success, statusCode, body } = await pacienteController.deletePaciente(req.params.id)
    res.status(statusCode).json({ success, statusCode, body })
})

export default pacientesRouter