import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import TransactionModal from "../components/transactionModal.jsx";
import TransactionList from "../components/transactionList.jsx";
import { logoutUser } from "./auth/auth.service.js";
import { apiFetch } from "../api.js";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

async function fetchTransactions() {

    const userId = localStorage.getItem("user_id");

    const data = await apiFetch(`/transactions/${userId}`);

    return Array.isArray(data) ? data : [];
}

export default function Dashboard() {

    const [currency, setCurrency] = useState("₽");
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    function toggleCurrency() {
        setCurrency((prev) =>
            prev === "₽" ? "$" : "₽"
        );
    }

    async function loadTransactions() {
        setTransactions(await fetchTransactions());
    }

    useEffect(() => {
        fetchTransactions().then(setTransactions);
    }, []);

    const balance = transactions.reduce((acc, t) => {
        const amount = Number(t.amount);
        return t.type === "income"
            ? acc + amount
            : acc - amount;
    }, 0);

    async function addTransaction(transaction) {

        const response = await apiFetch("/transactions", {
            method: "POST",
            body: JSON.stringify({
                ...transaction,
                user_id: localStorage.getItem("user_id")
            })
        });

        if (response.error) {
            alert(response.error);
            return;
        }

        setIsModalOpen(false);
        await loadTransactions();
    }

    async function deleteTransaction(id) {

        await apiFetch(`/transactions/${id}`, {
            method: "DELETE"
        });

        await loadTransactions();
    }

    const redirect = () => {
        navigate(`/user/${username}`)
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