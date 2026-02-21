import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LuPencil } from "react-icons/lu"
import styles from "./page.module.css"

export default function Agendamento() {

	const [form, setForm] = useState({
	paciente: "",
	especialidade: "",
	medico: "",
	data: "",
	hora: "",
	})

	const navigate = useNavigate()
	const [editingId, setEditingId] = useState(null)
	const API_URL = "http://localhost:3000/agendamento"
	const [loading, setLoading] = useState(true)
	const [agendamentos, setAgendamentos] = useState([])
	const authData = JSON.parse(localStorage.getItem("auth"))

	// Proteção da rota, manda o usuario para a homepage se a role não for admin
    useEffect(() => {
        if (!authData || authData.user.role !== "admin") {
            navigate("/")
        }
    }, [authData, navigate])

    // Buscar agendamentos
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAgendamentos(data.body)
                }
            })
            .finally(() => setLoading(false))
    }, [])

	const reloadAgendamentos = async () => {
        const res = await fetch(API_URL)
        const data = await res.json()
        setAgendamentos(data.body)
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
		reloadAgendamentos()

	} catch (error) {
		console.error("Erro:", error)
		alert("Erro ao salvar agendamento")
	}
	}

	const handleEdit = (agendamento) => {
        setEditingId(agendamento._id)
        setForm({
            paciente: agendamento.paciente,
            especialidade: agendamento.especialidade,
            medico: agendamento.medico,
            data: agendamento.data?.split("T")[0],
            hora: agendamento.hora,
            status: agendamento.status
        })
    }

	if (loading) {
		return <h2 className={styles.loading}>Carregando agendamentos...</h2>
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

			<input
			name="status"
			placeholder="Status"
			value={form.status}
			onChange={handleChange}
			/>
			<button className={`${styles.btn} ${styles.adminBtn}`} type="submit">
			{editingId ? "Atualizar Agendamento" : "Criar Agendamento"}
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
				<th>Status</th>
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
				<tr key={a._id}>
					<td>{a.paciente}</td>
					<td>{a.especialidade}</td>
					<td>{a.medico}</td>
					<td>{a.data}</td>
					<td>{a.hora}</td>
					<td>{a.status}</td>
					<td><button 
					onClick={() => handleEdit(a)}
					className={styles.editBtn}
					>
					<LuPencil size={16} /> Editar
					</button></td>
				</tr>
			))}
			</tbody>
		</table>

		</div>
	</div>
	)
}