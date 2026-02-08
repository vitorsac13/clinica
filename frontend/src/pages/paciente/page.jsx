import { useState } from "react"
import styles from "./page.module.css"

export default function Paciente() {

  const [pacientes, setPacientes] = useState([
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "11999999999" },
    { id: 2, nome: "Ana Souza", email: "ana@email.com", telefone: "11988888888" }
  ])

  const [search, setSearch] = useState("")

  const filtered = pacientes.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (!auth || auth.user.role !== "admin") {
      navigate("/profile")
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>👥 Gestão de Pacientes</h1>

        <div className={styles.topBar}>
          <input
            placeholder="Buscar paciente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <button className={styles.addBtn}>+ Novo Paciente</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>{p.telefone}</td>
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