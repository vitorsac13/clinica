import { useState } from "react"
import styles from "./medicos.module.css"

export default function Medico() {

  const [medicos, setMedicos] = useState([
    { id: 1, nome: "Dr. João Cardoso", especialidade: "Cardiologia", crm: "12345-SP" },
    { id: 2, nome: "Dra. Ana Lima", especialidade: "Dermatologia", crm: "54321-SP" }
  ])

  useEffect(() => {
    if (!auth || auth.user.role !== "admin") {
      navigate("/profile")
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>🩺 Gestão de Médicos</h1>

        <button className={styles.addBtn}>+ Novo Médico</button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>CRM</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {medicos.map(m => (
              <tr key={m.id}>
                <td>{m.nome}</td>
                <td>{m.especialidade}</td>
                <td>{m.crm}</td>
                <td>
                  <button className={styles.editBtn}>Editar</button>
                  <button className={styles.deleteBtn}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}