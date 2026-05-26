import Header from '../components/header'
import Notes from '../components/notes'
import styles from './dashboard.module.css'

export default function Dashboard () {    
    return (
        <div className={styles.wrapper}>
        <Header />
        <Notes />
        </div>
    )
}