import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth"
import styles from './page.module.css'

export default function Profile() {
  const { logout } = authServices()
  const navigate = useNavigate()
  const authData = JSON.parse(localStorage.getItem("auth"))

  const [consultas, setConsultas] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    if (!authData) navigate("/auth")
  }, [authData, navigate])

  useEffect(() => {
    // SIMULA CONSULTAS DO BACKEND
    setConsultas([
      {
        id: 1,
        pacienteEmail: authData?.user?.email,
        medico: "Dr. João Cardoso",
        especialidade: "Cardiologia",
        data: "2026-02-10",
        hora: "14:00",
      },
      {
        id: 2,
        pacienteEmail: authData?.user?.email,
        medico: "Dra. Ana Lima",
        especialidade: "Dermatologia",
        data: "2026-02-15",
        hora: "09:30",
      },
    ])
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleEdit = () => navigate("/admin")

  // GERAR CALENDÁRIO DO MÊS
  const daysInMonth = new Date().getDate()
  const month = new Date().getMonth()
  const year = new Date().getFullYear()

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

  const consultasDoDia = consultas.filter(c => c.data === selectedDate)

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>

        {/* PERFIL */}
        <div className={styles.profileAvatar}>
          {authData?.user?.email?.charAt(0).toUpperCase()}
        </div>

        <h1 className={styles.profileName}>
          {authData?.user?.fullname || "User"}
        </h1>

        <p className={styles.profileEmail}>{authData?.user?.email}</p>

        <div className={styles.profileAction}>
          {authData?.user?.role === 'admin' && (
            <button className={`${styles.btn} ${styles.adminBtn}`} onClick={handleEdit}>
              Admin
            </button>
          )}
          <button className={styles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* AGENDA GOOGLE CALENDAR */}
        <h2 className={styles.calendarTitle}>📅 Minha Agenda</h2>

        <div className={styles.calendarGrid}>
          {calendarDays.map(day => {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
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
            <h3>Consultas em {selectedDate}</h3>

            {consultasDoDia.length === 0 && <p>Nenhuma consulta</p>}

            {consultasDoDia.map(c => (
              <div key={c.id} className={styles.consultaCard}>
                <p><b>Médico:</b> {c.medico}</p>
                <p><b>Especialidade:</b> {c.especialidade}</p>
                <p><b>Hora:</b> {c.hora}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}