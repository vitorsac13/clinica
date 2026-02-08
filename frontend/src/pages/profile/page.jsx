import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/auth"
import styles from './page.module.css'

export default function Profile() {
    const { logout } = authServices()
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem("auth"))

    const [consultas, setConsultas] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(() => {
        if (!authData) navigate("/auth")
    }, [authData, navigate])

    useEffect(() => {
        // SIMULA CONSULTAS DO BACKEND
        setConsultas([
        {
            id: 1,
            email: authData?.user?.email,
            medico: "Dr. João Cardoso",
            especialidade: "Cardiologia",
            data: "2026-02-10",
            hora: "14:00",
        },
        {
            id: 2,
            email: authData?.user?.email,
            medico: "Dra. Ana Lima",
            especialidade: "Dermatologia",
            data: "2026-02-15",
            hora: "09:30",
        },
        ])
    }, [])

  	// CONSULTAS DO DIA
    const consultasDoDia = consultas.filter(c => c.data === selectedDate)

    // FUNÇÕES DE NAVEGAÇÃO
    const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

	const handleEdit = () => navigate("/admin")

	// GERAR DIAS DO MÊS
	const year = currentDate.getFullYear()
	const month = currentDate.getMonth()

	const firstDay = new Date(year, month, 1).getDay() // 0 = domingo
	const daysInMonth = new Date(year, month + 1, 0).getDate()

	const calendarDays = []

	// Dias vazios antes do mês começar
	for (let i = 0; i < firstDay; i++) {
	calendarDays.push(null)
	}

	// Dias do mês
	for (let day = 1; day <= daysInMonth; day++) {
	calendarDays.push(day)
	}

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
			<h2 className={styles.calendarTitle}>Minhas Consultas</h2>

			<div className={styles.calendarHeader}>
			<button className={styles.navBtn} onClick={prevMonth}>◀</button>
			<h3>
				{currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
			</h3>
			<button className={styles.navBtn} onClick={nextMonth}>▶</button>
			</div>

			{/* DIAS DA SEMANA */}
			<div className={styles.weekDays}>
			{["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
				<div key={d} className={styles.weekDay}>{d}</div>
			))}
			</div>

			{/* GRID DO CALENDÁRIO */}
			<div className={styles.calendarGrid}>
			{calendarDays.map((day, index) => {
				if (!day) return <div key={index} className={styles.emptyDay}></div>

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

				{consultasDoDia.length === 0 && <p>Nenhuma consulta</p>}

				{consultasDoDia.map(c => (
				<div key={c.id} className={styles.consultaCard}>
					<p><b>Paciente:</b> {c.email}</p>
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