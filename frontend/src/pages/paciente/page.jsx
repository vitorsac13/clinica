import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./page.module.css"

export default function Paciente() {

  const navigate = useNavigate()

  const [pacientes, setPacientes] = useState([
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "11999999999" },
    { id: 2, nome: "Ana Souza", email: "ana@email.com", telefone: "11988888888" }
  ])

  const [search, setSearch] = useState("")

  const filtered = pacientes.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    
    if (!auth || auth.user.role !== "admin") {
      navigate("/profile")
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>Gestão de Pacientes</h1>

        {/* FORMULÁRIO */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
              name="nome"
              placeholder="Nome do paciente"
              value={form.nome}
              onChange={handleChange}
              />
        
              <input
              name="cpf"
              placeholder="CPF do paciente"
              value={form.especialidade}
              onChange={handleChange}
              />
        
              <input
              name="nascimento"
              placeholder="Data de nascimento"
              value={form.crm}
              onChange={handleChange}
              />
        
              <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              />
        
              <button className={`${styles.btn} ${styles.addBtn}`} type="submit">
              {editingId ? "Atualizar Paciente" : "Adicionar Paciente"}
              </button>
            </form>
        
            <div className={styles.topBar}>
              <input
              placeholder="Buscar paciente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              /> 
            </div>
        
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
              </thead>
        
              <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                <td>{p.nome}</td>
                <td>{p.cpf}</td>
                <td>{p.nascimento}</td>
                <td>{p.email}</td>
                <td>
                  <button onClick={() => handleEdit(m)} className={styles.editBtn}>Editar</button>
                  <button onClick={() => handleDelete(m._id)} className={styles.deleteBtn}>Excluir</button>
                </td>
                </tr>
              ))}
              </tbody>
            </table>

      </div>
    </div>
  )
}