import { LuHouse, LuCalendar, LuCircleUser, LuStethoscope, LuLogOut } from "react-icons/lu"
import styles from "./page.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

    const [loading, setLoading] = useState(true)
    const [agendamentos, setAgendamentos] = useState([])
    const API_URL = "http://localhost:3000/agendamento"

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const calendarDays = []

    for (let i = 0; i < firstDay; i++) calendarDays.push(null)
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

    const agendamentosDoDia = agendamentos.filter(c =>
		c.data && new Date(c.data).toISOString().split("T")[0] === selectedDate
	)

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    const navigate = useNavigate()
    
    useEffect(() => {
      const auth = JSON.parse(localStorage.getItem("auth"))
      
      if (!auth || auth.user.role !== "admin") {
        navigate("/profile")
      }
    }, [])

	useEffect(() => {
		async function loadAgendamentos() {
			try {
				const response = await fetch(API_URL)
				const data = await response.json()

				console.log("API:", data)

				setAgendamentos(Array.isArray(data) ? data : data.body || [])
			} catch (error) {
				console.error("Erro ao buscar agendamentos:", error)
			} finally {
				setLoading(false)
			}
		}

		loadAgendamentos()
	}, [])

    return (
        <div className={styles.dashboardWrapper}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
            <h2 className={styles.logo}>CLÍNICA</h2>

            <nav>
            <button onClick={() => navigate("/dashboard")}><LuHouse size={18}/> Dashboard</button>
            <button onClick={() => navigate("/paciente")}><LuCircleUser size={18}/> Pacientes</button>
            <button onClick={() => navigate("/medico")}><LuStethoscope size={18}/> Médicos</button>
            </nav>

            <button className={styles.logoutBtn}>
            <LuLogOut size={18}/> Sair
            </button>
        </aside>

        {/* MAIN */}
        <main className={styles.dashboardMain}>
            <h1 className={styles.pageTitle}>Painel Administrativo</h1>
            <p className={styles.pageSubtitle}>Sistema de Gestão de Clínica</p>

            {/* MÉTRICAS */}
            <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <h3>Consultas Hoje</h3>
                <span>1</span>
            </div>
            <div className={styles.statCard}>
                <h3>Pacientes Ativos</h3>
                <span>50</span>
            </div>
            <div className={styles.statCard}>
                <h3>Médicos</h3>
                <span>4</span>
            </div>
            <div className={styles.statCard}>
                <h3>Receita Mensal</h3>
                <span>R$ 20.000</span>
            </div>
            </div>

            {/* CONSULTAS */}
            <h2 className={styles.sectionTitle}>Consultas Recentes</h2>

            <table className={styles.table}>
            <thead>
                <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Data e Hora</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
				{agendamentos.map((agendamento) => (
					<tr key={agendamento._id}>
					<td>{agendamento.paciente}</td>
					<td>{agendamento.medico}</td>
					<td>
						{new Date(agendamento.data).toLocaleDateString("pt-BR")} -{" "}
						{agendamento.hora}
					</td>
					<td
						className={
						agendamento.status === "Confirmado"
							? styles.statusConfirmado
							: styles.statusPendente
						}
					>
						{agendamento.status}
					</td>
					</tr>
				))}
			</tbody>
            </table>

        {/* GOOGLE CALENDAR STYLE */}
        <h2 className={styles.sectionTitle}>Agenda Geral da Clínica</h2>

        <div className={styles.calendarHeader}>
          <button onClick={prevMonth}>◀</button>
          <h3>{currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}</h3>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className={styles.weekDays}>
          {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className={styles.calendarGrid}>
          {calendarDays.map((day, i) => {
            if (!day) return <div key={i} className={styles.emptyDay}></div>

            const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
            const hasConsulta = agendamentos.some(c => { return c.data?.split("T")[0] === dateStr })

            return (
              <div
                key={day}
                className={`${styles.calendarDay} ${hasConsulta ? styles.hasConsulta : ""}`}
                onClick={() => setSelectedDate(dateStr)}
              >
                {day}
              </div>
            )
          })}
        </div>

        {/* DETALHES DO DIA */}
        {selectedDate && (
          <div className={styles.dayDetails}>
            <h3>Consultas em {new Date(selectedDate+"T00:00:00").toLocaleDateString("pt-BR")}</h3>

            {agendamentosDoDia.length === 0 && <p>Nenhuma consulta</p>}

            {agendamentosDoDia.map(c => (
  				<div key={c._id} className={styles.consultaCard}>
                <p><b>Paciente:</b> {c.paciente}</p>
                <p><b>Médico:</b> {c.medico}</p>
                <p><b>Hora:</b> {c.hora}</p>
              </div>
            ))}
          </div>
        )}
        </main>
        </div>
    )
}