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

    async updateProduct(agendamentoId, agendamentoData){
        
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(agendamentoId) }, { $set: agendamentoData } )
        return result 
        
    }

}