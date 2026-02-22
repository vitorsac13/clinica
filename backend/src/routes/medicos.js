import express from "express"
import MedicoController from "../controllers/medicoController.js"
import authMiddleware from "../helpers/authMiddleware.js"
import adminMiddleware from "../helpers/adminMiddleware.js"

const medicosRouter = express.Router()
const medicoController = new MedicoController()

// LISTAR MÉDICOS
medicosRouter.get("/", async (req, res) => {
    const { success, statusCode, body } = await medicoController.getMedicos()
    res.status(statusCode).json({ success, statusCode, body })
})


// CRIAR MÉDICO (ADMIN ONLY)
medicosRouter.post("/", async (req, res) => {
    const { success, statusCode, body } = await medicoController.createMedico(req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// ATUALIZAR MÉDICO (ADMIN ONLY)
medicosRouter.put("/:id", async (req, res) => {
    const { success, statusCode, body } = await medicoController.updateMedico(req.params.id, req.body)
    res.status(statusCode).json({ success, statusCode, body })
})


// DELETAR MÉDICO (ADMIN ONLY)
medicosRouter.delete("/:id", async (req, res) => {
    const { success, statusCode, body } = await medicoController.deleteMedico(req.params.id)
    res.status(statusCode).json({ success, statusCode, body })
})

export default medicosRouter