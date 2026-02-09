import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

const collectionName = 'medico'

export default class MedicoDAO {

    async getMedicos(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async deleteMedico(medicoId){
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(medicoId) })
        return result
    }

    async updateMedico(medicoId, medicoData){
                
    }

}