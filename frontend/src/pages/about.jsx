import styles from './about.module.css'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/')
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.header}>Financial Tracker</p>
                <div className={styles.text_container}>
                    <p className={`${styles.text} ${styles.text_1}`}>Веб-приложение для учета личных финансов.</p>
                    <p className={`${styles.text} ${styles.text_2}`}>Пользователь фиксирует доходы и расходы, управляет счетами и</p>
                    <p className={`${styles.text} ${styles.text_3}`}>категориями, а система предоставляет аналитику и отчеты</p>
                </div>
                <div className={styles.list_box}>
                    <ul className={styles.dolboebi_list}>
                        <li className={styles.item}>Артём Клепиков - Frontend (React)</li>
                        <li className={styles.item}>Мухамед Хураяев - Backend (Flask)</li>
                        <li className={styles.item}>Валентин Соловьев - Data Egineer (Sqlite)</li>
                    </ul>
                </div>
                <button className={styles.route_btn} onClick={goHome}>Заценить</button>
            </div>
        </div>
    )
}