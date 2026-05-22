import { useNavigate } from "react-router-dom"
import styles from '../pages/home.module.css'

export default function Center() {
    const navigate = useNavigate()
    const register = () => {
        navigate('/login')
    }
    
    return(
        <div className={styles.text_container}>
            <div className={styles.center_text}>
                <p className={styles.center_text_1}>Your money,</p>
                <p className={styles.center_text_2}>beautifully</p>
                <p className={styles.center_text_3}>organized.</p>
            </div>
            <button onClick={register} className={styles.reg_btn_2}><span>Get Started</span></button>
        </div>
    )
}