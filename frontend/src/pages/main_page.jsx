import Header from '../components/Header'
import Button from '../components/button'
import Sidebar from '../components/sidebar'
import styles from './main_page.module.css'
import { useState } from 'react'

export default function Main_page () {
    const [value, setValue] = useState("click the button")
    
    function handleClick() {
    console.log("clicked")
    setValue(type)
    }
    
    return (
        <div className={styles.wrapper}>
        <Header />
        <Sidebar />
        </div>
    )
}