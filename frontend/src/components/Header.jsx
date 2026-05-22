import styles from '../pages/main_page.module.css'
import { FaWallet } from 'react-icons/fa'
import { FaRubleSign } from 'react-icons/fa'
import { FaEllipsisV } from 'react-icons/fa'
const balance = 0
const currency = '$'

export default function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.left_box}>
            <FaWallet className={styles.icon}/>
            <p className={styles.balance}>{balance} {currency}</p>
            </div>
            <div className={styles.right_box}>
                <button className={styles.transaction_btn}>ADD TRANSACTION</button> 
                <FaEllipsisV className={styles.el_icon} />
            </div>
        </header>
    )
}