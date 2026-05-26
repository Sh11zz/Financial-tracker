import styles from '../pages/dashboard.module.css'
import { FaUser, FaWallet } from 'react-icons/fa'
import { FaRubleSign } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const balance = 0
const currency = '$'

export default function Header() {
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    const see_profile = () => {
        navigate(`/${username}`)
    }
    return(
        <header className={styles.header}>
            <div className={styles.left_box}>
                <FaWallet className={styles.icon}/>
                <p className={styles.balance}>{balance} {currency}</p>
            </div>
            <div className={styles.right_box}>
                <button className={styles.transaction_btn}>ADD TRANSACTION</button>
                <button className={styles.profile_btn} onClick={see_profile}><FaUser /></button> 
            </div>
        </header>
    )
}