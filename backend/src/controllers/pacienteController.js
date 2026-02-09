import PacienteDAO from "../dao/pacienteDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class PacienteController {

    constructor() {
        this.dao = new PacienteDAO()
    }

    async getPacientes(){
        try {
            const pacientes = await this.dao.getPacientes()
            return ok(pacientes)

        } catch (error) {
            return serverError(error)
        }
    }

    async deletePaciente(pacienteId){
        try {
            const result = await this.dao.deletePaciente(pacienteId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updatePaciente(pacienteId, pacienteData){
        try {
            const result = await this.dao.updatePaciente(pacienteId, pacienteData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}