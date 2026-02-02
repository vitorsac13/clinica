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
        if (medicoData.password) {
            const salt = crypto.randomBytes(16)
            crypto.pbkdf2(medicoData.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
                if(err) {
                    throw new Error('Error during hashing password!')
                }
                medicoData = { ...medicoData, password: hashedPassword, salt }

                const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(medicoId) }, { $set: medicoData } )

                return result
            })
        } else {
            const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(medicoId) }, { $set: medicoData } )
            return result 
        }

        
    }

}