import { Mongo } from "../database/mongo.js"
import { ObjectId } from "mongodb"

const collectionName = "medico"

export default class MedicoDAO {

  async getMedicos() {
    const result = await Mongo.db
      .collection(collectionName)
      .find({})
      .toArray()

    return result
  }

  async createMedico(medicoData){
              
      medicoData.createdAt = new Date()

      const result = await Mongo.db
          .collection(collectionName)
          .insertOne(medicoData)

      return result
  }

  async updateMedico(medicoId, medicoData) {

    const updateData = {
      ...medicoData,
      updatedAt: new Date()
    }

    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(medicoId) },
        { $set: updateData },
        { returnDocument: "after" } // retorna documento atualizado
      )

    return result
  }

  async deleteMedico(medicoId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(medicoId) })

    return result
  }
}