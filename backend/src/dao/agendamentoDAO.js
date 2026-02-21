import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'agendamento'

export default class AgendamentoDAO {

    async getAgendamentos(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async getAgendamentosByUserId(userId) {
        return await Mongo.db
            .collection(collectionName)
            .find({ userId })
            .sort({ createdAt: -1 })
            .toArray()
    }

    async addAgendamento(agendamentoData){
            
            agendamentoData.createdAt = new Date()
    
            const result = await Mongo.db
                .collection(collectionName)
                .insertOne(agendamentoData)
    
            return result
        }
    
    async deleteAgendamento(agendamentoId){
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(agendamentoId) })
        return result
    }

    async updateAgendamento(agendamentoId, agendamentoData) {
    const result = await Mongo.db.collection("agendamento").updateOne(
        { _id: new ObjectId(agendamentoId) },
        {
            $set: {
                paciente: agendamentoData.paciente,
                especialidade: agendamentoData.especialidade,
                medico: agendamentoData.medico,
                data: agendamentoData.data,
                hora: agendamentoData.hora,
                status: agendamentoData.status
            }
        }
    )

    return result
}

}