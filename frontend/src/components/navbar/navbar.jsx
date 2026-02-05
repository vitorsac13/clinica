import styles from './navbar.module.css'
import { LuUserRound, LuMenu, LuHouse  } from "react-icons/lu"
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../vite.svg"

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <nav className={styles.navbarContainer}>
            {/* DESKTOP */}
            <div className={styles.navbarItems}>
                <div className={styles.navbarLeft}>
                    <Link to="/"><img src={logo} alt="Logo" className={styles.logo}/></Link>
                </div>

                <div className={styles.navbarRight}>
                    <Link to="/appointment" className={styles.navbarIcon}>Agendamento</Link>
                    <Link to="/"><LuHouse className={styles.navbarIcon} /></Link>
                    <Link to="/profile"><LuUserRound className={styles.navbarIcon} /></Link>
                </div>
            </div>

            {/* MOBILE */}
            <div className={styles.mobileNavbarItems}>
                <LuMenu
                    className={styles.navbarIcon}
                    onClick={() => setOpenMenu(!openMenu)}
                />
            </div>

            <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
                <div className={styles.drawer}>
                    <Link to="/" className={styles.drawerLink}>Home</Link>
                    <Link to="/profile" className={styles.drawerLink}>Perfil</Link>
                </div>
            </Drawer>
        </nav>
    )
}