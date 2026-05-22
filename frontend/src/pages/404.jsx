import styles from './404.module.css'
import { useNavigate } from 'react-router-dom'

export default function Not_found() {
    const navigate = useNavigate()
    const return_home = () => {
        navigate('/')
    }

    return(
        <div className={styles.container}>
            <p className={styles.number}>404</p>
            <p className={styles.text}>Page not found :(</p>
            <button onClick = {return_home} className={styles.home_btn}>Return home</button>
        </div>
    )
}