import styles from './profile.module.css'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    const navigate = useNavigate()
    const redirect = () => {
        navigate('/hello')
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={`${styles.username} ${styles.item}`}>Username: {username}</p>
                <p className={`${styles.email} ${styles.item}`}>Email: {email}</p>
                <p className={`${styles.password} ${styles.item}`}>Password: {password}</p>         
                <button className={styles.btn1} onClick={redirect}><span>Go back</span></button>
            </div>
        </div>
    )
}