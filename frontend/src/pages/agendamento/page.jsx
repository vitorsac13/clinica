import { useState } from "react"
import styles from "./page.module.css"

export default function Agendamento() {
	const [form, setForm] = useState({
	paciente: "",
	especialidade: "",
	medico: "",
	data: "",
	hora: "",
	})

	const [editingId, setEditingId] = useState(null)
	const API_URL = "http://localhost:3000/agendamento"
	const [agendamentos, setAgendamento] = useState([])

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
			paciente: form.paciente,
			especialidade: form.especialidade,
			medico: form.medico,
			data: form.data,
			hora: form.hora,
			status: form.status || "Pendente"
		})
		})

		const data = await response.json()

		if (!data.success) {
		throw new Error("Erro ao salvar agendamento")
		}

		// Reset formulário
		setForm({
		paciente: "",
		especialidade: "",
		medico: "",
		data: "",
		hora: "",
		status: "Pendente"
		})

		setEditingId(null)


	} catch (error) {
		console.error("Erro:", error)
		alert("Erro ao salvar agendamento")
	}
	}

	return (
	<div className={styles.appointmentContainer}>
		<div className={styles.appointmentCard}>
		<h1 className={styles.appointmentName}>Agendamento de Consultas</h1>

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