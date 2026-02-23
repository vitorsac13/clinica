import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./page.module.css"

export default function Paciente() {

	const [form, setForm] = useState({
		nome: "",
		cpf: "",
		nascimento: "",
		email: "",
	})
	const navigate = useNavigate()
	const [editingId, setEditingId] = useState(null)
	const API_URL = "http://localhost:3000/paciente"
	const [loading, setLoading] = useState(true)
	const [pacientes, setPacientes] = useState([])
	const [search, setSearch] = useState("")
	const authData = JSON.parse(localStorage.getItem("auth"))

	// Proteção da rota, manda o usuario para a homepage se a role não for admin
		useEffect(() => {
			if (!authData || authData.user.role !== "admin") {
				navigate("/")
			}
		}, [authData, navigate])

	// Buscar pacientes
		useEffect(() => {
			fetch(API_URL)
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						setPacientes(data.body)
					}
				})
				.finally(() => setLoading(false))
		}, [])

	const reloadPacientes = async () => {
			const res = await fetch(API_URL)
			const data = await res.json()
			setPacientes(data.body)
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
			cpf: form.cpf,
			nascimento: form.nascimento,
			email: form.email
		})
		})

		const data = await response.json()

		if (!data.success) {
		throw new Error("Erro ao salvar paciente")
		}

		// Reset formulário
		setForm({
		nome: "",
		cpf: "",
		nascimento: "",
		email: ""
		})

		setEditingId(null)
		reloadPacientes()

		} catch (error) {
		console.error("Erro:", error)
		alert("Erro ao salvar paciente")
		}
	}

	const handleEdit = (paciente) => {
		setEditingId(paciente._id)
		setForm({
		nome: paciente.nome,
		cpf: paciente.cpf,
		nascimento: paciente.nascimento,
		email: paciente.email
		})
	}

	const handleDelete = async (id) => {
		if (!window.confirm("Deseja excluir este paciente?")) return

		await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${authData.token}`
		}
		})

		reloadPacientes()
	}

	const filtered = pacientes.filter(p =>
		p.nome.toLowerCase().includes(search.toLowerCase())
	)

	if (loading) {
		return <h2 className={styles.loading}>Carregando pacientes...</h2>
	}

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