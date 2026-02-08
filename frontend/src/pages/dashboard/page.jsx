import { LuHouse, LuCalendar, LuCircleUser, LuStethoscope, LuLogOut } from "react-icons/lu"
import styles from "./page.module.css"

export default function DashboardPage() {

  return (
    <div className={styles.dashboardWrapper}>

      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>CLÍNICA</h2>

        <nav>
          <button><LuHouse size={18}/> Dashboard</button>
          <button><LuCalendar size={18}/> Agenda Geral</button>
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

      </main>
    </div>
  )
}