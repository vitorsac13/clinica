import styles from './footer.module.css'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { useState } from 'react'


export default function Footer() {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <footer className={styles.footer}>
            <div className={styles.socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
                </a>
    
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
                </a>
    
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
                </a>
            </div>

            <p>© 2026 Clinica — Todos os direitos reservados</p>
        </footer>
    )
}