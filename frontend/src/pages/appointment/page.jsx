import { useState } from "react"
import styles from "./page.module.css"

export default function Agendamentos() {
  const [form, setForm] = useState({
    paciente: "",
    especialidade: "",
    medico: "",
    data: "",
    hora: "",
  })

  const [agendamentos, setAgendamentos] = useState([])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.paciente) return alert("Informe o nome do paciente")

    setAgendamentos([...agendamentos, { id: Date.now(), ...form }])
    setForm({ paciente: "", especialidade: "", medico: "", data: "", hora: "" })
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h1 className={styles.profileName}>Agendamento de Consultas</h1>
        <p className={styles.profileEmail}>Clínica Multiespecialidade</p>

        {/* FORMULÁRIO */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="paciente"
            placeholder="Nome do paciente"
            value={form.paciente}
            onChange={handleChange}
          />

          <input
            name="especialidade"
            placeholder="Especialidade"
            value={form.especialidade}
            onChange={handleChange}
          />

          <input
            name="medico"
            placeholder="Médico"
            value={form.medico}
            onChange={handleChange}
          />

          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
          />

          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
          />

          <button className={`${styles.btn} ${styles.adminBtn}`} type="submit">
            Criar Agendamento
          </button>
        </form>

        {/* TABELA */}
        <h2 className={styles.tableTitle}>Agendamentos Existentes</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Especialidade</th>
              <th>Médico</th>
              <th>Data</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.length === 0 && (
              <tr>
                <td colSpan="5" className={styles.empty}>
                  Nenhum agendamento cadastrado
                </td>
              </tr>
            )}

            {agendamentos.map((a) => (
              <tr key={a.id}>
                <td>{a.paciente}</td>
                <td>{a.especialidade}</td>
                <td>{a.medico}</td>
                <td>{a.data}</td>
                <td>{a.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}