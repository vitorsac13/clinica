import { Mongo } from "../database/mongo.js"
import { ObjectId } from "mongodb"

const collectionName = "paciente"

export default class PacienteDAO {

  async getPacientes() {
    const result = await Mongo.db
      .collection(collectionName)
      .find({})
      .toArray()

    return result
  }

  async createPaciente(pacienteData){
                
      pacienteData.createdAt = new Date()

      const result = await Mongo.db
          .collection(collectionName)
          .insertOne(pacienteData)

      return result
  }

  async updatePaciente(pacienteId, pacienteData) {

    const updateData = {
      ...pacienteData,
      updatedAt: new Date()
    }

    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(pacienteId) },
        { $set: updateData },
        { returnDocument: "after" } // retorna documento atualizado
      )

    return result
  }

  async deletePaciente(pacienteId) {
    const result = await Mongo.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new ObjectId(pacienteId) })

    return result
  }
}