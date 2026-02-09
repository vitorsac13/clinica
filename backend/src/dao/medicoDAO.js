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

  async createMedico(medicoData) {

    // Gera ID público (opcional)
    const medico = {
      _id: new ObjectId(),
      nome: medicoData.nome,
      especialidade: medicoData.especialidade,
      crm: medicoData.crm,
      email: medicoData.email || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await Mongo.db
      .collection(collectionName)
      .insertOne(medico)

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
      medico
    }
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