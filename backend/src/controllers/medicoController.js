import MedicoDAO from "../dao/medicoDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class MedicoController {

    constructor() {
        this.dao = new MedicoDAO()
    }

    async getMedicos(){
        try {
            const medicos = await this.dao.getMedicos()
            return ok(medicos)

        } catch (error) {
            return serverError(error)
        }
    }

    async deleteMedico(medicoId){
        try {
            const result = await this.dao.deleteMedico(medicoId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateMedico(medicoId, medicoData){
        try {
            const result = await this.dao.updateMedico(medicoId, medicoData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}