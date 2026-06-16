import { useState } from "react";
import styles from "./dashboard.module.css";
import TransactionModal from "../components/transactionModal.jsx";
import TransactionList from "../components/transactionList.jsx";
import { logoutUser } from "./auth/auth.service.js";
import { FaUserAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {

    const [currency, setCurrency] = useState("₽");
    const [transactions, setTransactions] = useState([]);

    function toggleCurrency() {
        setCurrency((prev) =>
            prev === "₽" ? "$" : "₽"
        );
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        const userId =
        localStorage.getItem(
            "user_id"
        );

        const response =
        await fetch(
            `http://localhost:8000/transactions/${userId}`
        );

        const data =
        await response.json();

        setTransactions(data);
    }

    const balance = transactions.reduce((acc, t) => {
    const amount = Number(t.amount);
    return t.type === "income"
        ? acc + amount
        : acc - amount;
}, 0);


    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    async function addTransaction(
    transaction
) {

    const userId =
        localStorage.getItem(
            "user_id"
        );

        await fetch(
            "http://localhost:8000/transactions",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    ...transaction,
                    user_id: userId
                })
            }
        );

         await loadTransactions();
    setIsModalOpen(false);

        loadTransactions();
    }
    
    async function deleteTransaction(id) {

        await fetch(
            `http://localhost:8000/transactions/${id}`,
            {
                method: "DELETE"
            }
        );

        loadTransactions();
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
                <FaWallet/><button onClick={toggleCurrency} className={styles.currency_btn}><span>{currency} {balance}</span></button>
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