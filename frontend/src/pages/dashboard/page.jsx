import styles from "./page.module.css"

export default function Dashboard() {
  // SIMULA DADOS DO BACKEND
  const stats = {
    totalConsultas: 128,
    consultasHoje: 5,
    pacientes: 320,
    faturamento: 12450,
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>

        <h1 className={styles.dashboardTitle}>📊 Painel Administrativo</h1>
        <p className={styles.dashboardSubtitle}>Clínica Multidisciplinar</p>

        {/* CARDS DE MÉTRICAS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total de Consultas</h3>
            <span>{stats.totalConsultas}</span>
          </div>

          <div className={styles.statCard}>
            <h3>Consultas Hoje</h3>
            <span>{stats.consultasHoje}</span>
          </div>

          <div className={styles.statCard}>
            <h3>Pacientes Cadastrados</h3>
            <span>{stats.pacientes}</span>
          </div>

          <div className={styles.statCard}>
            <h3>Faturamento (R$)</h3>
            <span>R$ {stats.faturamento}</span>
          </div>
        </div>

        {/* TABELA DE CONSULTAS RECENTES */}
        <h2 className={styles.tableTitle}>Consultas Recentes</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>João Silva</td>
              <td>Dr. João Cardoso</td>
              <td>Cardiologia</td>
              <td>10/02/2026</td>
              <td className={styles.statusConfirmado}>Confirmado</td>
            </tr>

            <tr>
              <td>Maria Lima</td>
              <td>Dra. Ana Lima</td>
              <td>Dermatologia</td>
              <td>11/02/2026</td>
              <td className={styles.statusPendente}>Pendente</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}