import styles from '../pages/home.module.css'
import logo from '../imgs/logo.jpg'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const login = () => {
        navigate('/login?mode=login')
    }

    const register = () => {
        navigate('/login?mode=register')
    }

    return(
        <header className={styles.header}>
            <div className={styles.left_box}>
                <img src={logo} className={styles.logo} />
                <p className={styles.name}>FinTrack</p>
            </div>
            <div className={styles.right_box}>
                <button onClick={login} className={styles.login_btn}>Login</button>
                <button onClick={register} className={styles.reg_btn}><span>Get Started</span></button>
            </div>
        </header>
    )
}