import styles from './page.module.css'
import {
  FaHeartbeat,
  FaPills,
  FaLeaf,
  FaUserMd,
  FaCheckCircle,
  FaShieldAlt
} from "react-icons/fa"

export default function Home() {
  return (
    <div className={styles.home}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Clinica</h1>
          <p>
            Cuidando da sua saúde com qualidade, confiança e medicamentos
            acessíveis.
          </p>
        </div>
      </section>

      {/* SAÚDE E BEM-ESTAR */}
      <section className={styles.section}>
        <h2>Saúde & Bem-Estar</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <FaHeartbeat className={styles.icon} />
            <h3>Qualidade de Vida</h3>
            <p>
              Soluções farmacêuticas pensadas para melhorar seu dia a dia.
            </p>
          </div>

          <div className={styles.card}>
            <FaLeaf className={styles.icon} />
            <h3>Bem-Estar Integral</h3>
            <p>
              Cuidamos da sua saúde física e mental com responsabilidade.
            </p>
          </div>

          <div className={styles.card}>
            <FaUserMd className={styles.icon} />
            <h3>Confiança Médica</h3>
            <p>
              Produtos desenvolvidos seguindo rigorosos padrões científicos.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}