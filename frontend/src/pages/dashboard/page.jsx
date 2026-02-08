import styles from "./page.module.css"
import { useState } from "react"

export default function Dashboard() {
    // SIMULA DADOS DO BACKEND
    const stats = {
        totalConsultas: 128,
        consultasHoje: 5,
        pacientes: 320,
        faturamento: 12450,
    }

    // CONSULTAS GERAIS
    const [consultas] = useState([
        { id: 1, paciente: "João Silva", medico: "Dr. João", data: "2026-02-10", hora: "10:00" },
        { id: 2, paciente: "Maria Lima", medico: "Dra. Ana", data: "2026-02-15", hora: "14:00" },
        { id: 3, paciente: "Pedro Costa", medico: "Dr. Lucas", data: "2026-02-20", hora: "09:30" },
    ])

    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const calendarDays = []
    for (let i = 0; i < firstDay; i++) calendarDays.push(null)
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

    const consultasDoDia = consultas.filter(c => c.data === selectedDate)

   return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>

        <h1 className={styles.dashboardTitle}>📊 Painel Administrativo</h1>

        {/* MÉTRICAS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}><h3>Total Consultas</h3><span>{stats.totalConsultas}</span></div>
          <div className={styles.statCard}><h3>Hoje</h3><span>{stats.consultasHoje}</span></div>
          <div className={styles.statCard}><h3>Pacientes</h3><span>{stats.pacientes}</span></div>
          <div className={styles.statCard}><h3>Faturamento</h3><span>R$ {stats.faturamento}</span></div>
        </div>

        {/* 🗓️ AGENDA GERAL */}
        <h2 className={styles.calendarTitle}>Agenda Geral da Clínica</h2>

        <div className={styles.calendarHeader}>
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
          <h3>{currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}</h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
        </div>

        <div className={styles.weekDays}>
          {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className={styles.calendarGrid}>
          {calendarDays.map((day, i) => {
            if (!day) return <div key={i}></div>

            const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
            const hasConsulta = consultas.some(c => c.data === dateStr)

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

        {/* CONSULTAS DO DIA */}
        {selectedDate && (
          <div className={styles.dayDetails}>
            <h3>Consultas em {new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR")}</h3>

            {consultasDoDia.map(c => (
              <div key={c.id} className={styles.consultaCard}>
                <p><b>Paciente:</b> {c.paciente}</p>
                <p><b>Médico:</b> {c.medico}</p>
                <p><b>Hora:</b> {c.hora}</p>
              </div>
            ))}

            {consultasDoDia.length === 0 && <p>Nenhuma consulta</p>}
          </div>
        )}

      </div>
    </div>
  )
}