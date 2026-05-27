import { useState } from "react";
import styles from "./dashboard.module.css";
import TransactionModal from "../components/transactionModal.jsx";
import TransactionList from "../components/transactionList.jsx";
import { logoutUser } from "./auth/auth.service.js";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const STORAGE_KEY = "transactions";

export default function Dashboard() {

    const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
    }, [transactions]);
    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    function addTransaction(transaction) {
    setTransactions((prev) => [...prev, transaction]);
    }

    const redirect = () => {
    navigate(`/user/${username}`)
    }

    return (
    <div className={styles.container}>
        <h1 className={styles.h1}>FinTrack</h1>
        <button className={styles.profile_btn} onClick={redirect}>Profile</button>
        <button className={styles.addBtn}onClick={() => setIsModalOpen(true)}>
            Add Transaction
        </button>
        <TransactionList transactions={transactions} />
        {isModalOpen && (<TransactionModal onClose={() => setIsModalOpen(false)} onAdd={addTransaction}/>)}
        <button className={styles.logout_btn} onClick={() => logoutUser(navigate)}>logout</button>
    </div>
    );
}