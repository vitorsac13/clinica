import { LuHouse, LuCalendar, LuCircleUser, LuStethoscope, LuLogOut } from "react-icons/lu"
import styles from "./page.module.css"
import { useState } from "react"

export default function Dashboard() {

    const [consultas] = useState([
        { id: 1, data: "2026-02-10", paciente: "João Silva", medico: "Dr. Carlos", hora: "14:00" },
        { id: 2, data: "2026-02-15", paciente: "Ana Souza", medico: "Dra. Maria", hora: "09:30" },
        { id: 3, data: "2026-02-20", paciente: "Pedro Lima", medico: "Dr. João", hora: "11:00" },
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

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    useEffect(() => {
      if (!auth || auth.user.role !== "admin") {
        navigate("/profile")
      }
    }, [])

    return (
        <div className={styles.dashboardWrapper}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
            <h2 className={styles.logo}>CLÍNICA</h2>

            <nav>
            <button><LuHouse size={18}/> Dashboard</button>
            <button><LuCircleUser size={18}/> Pacientes</button>
            <button><LuStethoscope size={18}/> Médicos</button>
            </nav>

            <button className={styles.logoutBtn}>
            <LuLogOut size={18}/> Sair
            </button>
        </aside>

        {/* MAIN */}
        <main className={styles.dashboardMain}>
            <h1 className={styles.pageTitle}>Painel Administrativo</h1>
            <p className={styles.pageSubtitle}>Sistema de gestão hospitalar</p>

            {/* MÉTRICAS */}
            <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <h3>Consultas Hoje</h3>
                <span>24</span>
            </div>
            <div className={styles.statCard}>
                <h3>Pacientes Ativos</h3>
                <span>1.284</span>
            </div>
            <div className={styles.statCard}>
                <h3>Médicos</h3>
                <span>12</span>
            </div>
            <div className={styles.statCard}>
                <h3>Receita Mensal</h3>
                <span>R$ 128.000</span>
            </div>
            </div>

            {/* CONSULTAS */}
            <h2 className={styles.sectionTitle}>Consultas Recentes</h2>

            <table className={styles.table}>
            <thead>
                <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Data</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>João Silva</td>
                <td>Dra. Maria</td>
                <td>08/02/2026</td>
                <td className={styles.statusConfirmado}>Confirmado</td>
                </tr>
                <tr>
                <td>Ana Souza</td>
                <td>Dr. Carlos</td>
                <td>09/02/2026</td>
                <td className={styles.statusPendente}>Pendente</td>
                </tr>
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

        {/* DETALHES DO DIA */}
        {selectedDate && (
          <div className={styles.dayDetails}>
            <h3>Consultas em {new Date(selectedDate+"T00:00:00").toLocaleDateString("pt-BR")}</h3>

            {consultasDoDia.length === 0 && <p>Nenhuma consulta</p>}

            {consultasDoDia.map(c => (
              <div key={c.id} className={styles.consultaCard}>
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