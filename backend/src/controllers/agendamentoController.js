import AgendamentoDAO from "../dao/agendamentoDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class AgendamentoController {

    constructor() {
        this.dao = new AgendamentoDAO()
    }

    async getAgendamentos(){
        try {
            const agendamentos = await this.dao.getAgendamentos()
            return ok(agendamentos)

        } catch (error) {
            return serverError(error)
        }
    }

    async getMyAgendamentos(user) {
            try {
                const agendamentos = await this.dao.getAgendamentosByUserId(
                    new ObjectId(user.id)
                )
    
                return ok(agendamentos)
            } catch (error) {
                console.error('❌ ERRO AO BUSCAR MEUS AGENDAMENTOS', error)
                return serverError(error)
            }
        }

    async addAgendamento(agendamentoData, user) {
            try {
                const agendamento = {
                    paciente: agendamentoData.paciente,
                    especialidade: agendamentoData.especialidade,
                    medico: agendamentoData.medico,
                    data: agendamentoData.data,
                    hora: agendamentoData.hora,
    
                    status: 'Pendente',
                    createdAt: new Date()
                }
    
                const result = await this.dao.addAgendamento(agendamento)
                return ok(result)
    
            } catch (error) {
                console.error('❌ ERRO AO CRIAR AGENDAMENTO:', error)
                return serverError(error)
            }
        }
    
    async deleteAgendamento(agendamentoId){
        try {
            const result = await this.dao.deleteAgendamento(agendamentoId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateAgendamento(agendamentoId, agendamentoData){
        try {
            const result = await this.dao.updateAgendamento(agendamentoId, agendamentoData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}