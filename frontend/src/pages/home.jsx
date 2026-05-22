import Center from "../components/home_center"
import Login_btn from "../components/home_center"
import Header from "../components/home_header"
import styles from "./home.module.css"

export default function Home() {    
    return(
        <div className={styles.wrapper}>
            <Header />
            <Center />
        </div>
    ) 
}