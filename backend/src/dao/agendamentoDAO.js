import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

const collectionName = 'agendamento'

export default class AgendamentoDAO {

    async getAgendamentos(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async deleteAgendamento(agendamentoId){
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(agendamentoId) })
        return result
    }

    async updateAgendamento(agendamentoId, agendamentoData){
        if (agendamentoData.password) {
            const salt = crypto.randomBytes(16)
            crypto.pbkdf2(agendamentoData.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
                if(err) {
                    throw new Error('Error during hashing password!')
                }
                agendamentoData = { ...agendamentoData, password: hashedPassword, salt }

                const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(agendamentoId) }, { $set: agendamentoData } )

                return result
            })
        } else {
            const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(agendamentoId) }, { $set: agendamentoData } )
            return result 
        }

        
    }

}