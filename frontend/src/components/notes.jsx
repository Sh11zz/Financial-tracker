import { useState } from 'react'
import styles from '../pages/dashboard.module.css'

export default function Notes() {
    const [inputValue, setInputValue] = useState('')
    const [notes, setNotes] = useState([])

    function createNote() {
        if (inputValue.length === 0) {
            return
        }
        setNotes([
            ...notes,
            inputValue
        ])
        setInputValue('')
    }

    return(

        <div className={styles.list_container}>
        <input className={styles.list_input} type='text' value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}/>
            <button className={styles.create_button}onClick={createNote}>create</button>
            <ul>
                {notes.map((note, index) => (<li key={index} className={styles.item}>{note}</li>))}
            </ul>
        </div>
    )
}