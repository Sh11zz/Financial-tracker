import { useState } from "react";
import styles from "./dashboard.module.css";
import TransactionModal from "../components/transactionModal.jsx";
import TransactionList from "../components/transactionList.jsx";
import { logoutUser } from "./auth/auth.service.js";
import { FaUserAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const STORAGE_KEY = "transactions";

export default function Dashboard() {

    let currency = '₽' 

    const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
    });

    const balance = transactions.reduce((acc, t) => {
    const amount = Number(t.amount);
    return t.type === "income"
        ? acc + amount
        : acc - amount;
}, 0);

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

    function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    }

    const redirect = () => {
    navigate(`/user/${username}`)
    }

    function button() {
        console.log('aaaaa')
    }

    return (
    <div className={styles.container}>
        <div className={styles.header}>
                <h1 className={styles.h1}>FinTrack</h1>
            <div className={styles.balance}>
                <FaWallet/><span>{currency}{balance}</span>
            </div>
        </div>
        <button className={styles.profile_btn} onClick={redirect}>Profile</button>
        <button className={styles.addBtn}onClick={() => setIsModalOpen(true)}>
            Add Transaction
        </button>
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        {isModalOpen && (<TransactionModal onClose={() => setIsModalOpen(false)} onAdd={addTransaction}/>)}
        <button className={styles.logout_btn} onClick={() => logoutUser(navigate)}>logout</button>
    </div>
    );
}