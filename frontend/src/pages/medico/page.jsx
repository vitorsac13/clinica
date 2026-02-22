import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./page.module.css"

export default function Medico() {
  
	const [form, setForm] = useState({
		nome: "",
		especialidade: "",
		crm: "",
	})
	const navigate = useNavigate()
	const [editingId, setEditingId] = useState(null)
	const API_URL = "http://localhost:3000/medico"
	const [loading, setLoading] = useState(true)
	const [medicos, setMedicos] = useState([])
	const authData = JSON.parse(localStorage.getItem("auth"))

	// Proteção da rota, manda o usuario para a homepage se a role não for admin
    useEffect(() => {
        if (!authData || authData.user.role !== "admin") {
            navigate("/")
        }
    }, [authData, navigate])

	// Buscar medicos
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMedicos(data.body)
                }
            })
            .finally(() => setLoading(false))
    }, [])

	const reloadMedicos = async () => {
        const res = await fetch(API_URL)
        const data = await res.json()
        setMedicos(data.body)
    }

	function handleChange(e) {
	setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const method = editingId ? "PUT" : "POST"
			const url = editingId ? `${API_URL}/${editingId}` : API_URL

			const response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nome: form.nome,
				especialidade: form.especialidade,
				crm: form.crm,
			})
			})

			const data = await response.json()

			if (!data.success) {
			throw new Error("Erro ao salvar agendamento")
			}

			// Reset formulário
			setForm({
			nome: "",
			especialidade: "",
			crm: "",
			})

			setEditingId(null)
			reloadMedicos()

		} catch (error) {
			console.error("Erro:", error)
			alert("Erro ao salvar médico")
		}
	}

	const handleEdit = (agendamento) => {
		setEditingId(agendamento._id)
		setForm({
			nome: agendamento.nome,
			especialidade: agendamento.especialidade,
			crm: agendamento.crm,
		})
	}

	const handleDelete = async (id) => {
		if (!window.confirm("Deseja excluir este agendamento?")) return

		await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${authData.token}`
			}
		})

		reloadMedicos()
	}

	if (loading) {
		return <h2 className={styles.loading}>Carregando médicos...</h2>
	}

	return (
	<div className={styles.container}>
		<div className={styles.card}>

		<h1>Gestão de Médicos</h1>

		{/* FORMULÁRIO */}
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
			name="nome"
			placeholder="Nome do médico"
			value={form.nome}
			onChange={handleChange}
			/>

			<input
			name="especialidade"
			placeholder="Especialidade"
			value={form.especialidade}
			onChange={handleChange}
			/>

			<input
			name="crm"
			placeholder="CRM"
			value={form.crm}
			onChange={handleChange}
			/>

			<button className={`${styles.btn} ${styles.adminBtn}`} type="submit">
			{editingId ? "Atualizar Agendamento" : "Criar Agendamento"}
			</button>
		</form>

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