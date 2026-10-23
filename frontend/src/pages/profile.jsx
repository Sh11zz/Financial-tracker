import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../api.js";

export default function Profile() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        apiFetch(`/user/${userId}`).then(setUser);
    }, []);

    function redirect() {
        navigate("/hello");
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.item}>Username: {user.username}</p>
                <p className={styles.item}>Email: {user.email}</p>
                <p className={styles.item}>Password: {user.password}</p>
                <button className={styles.btn1} onClick={redirect}>Go back</button>
            </div>
        </div>
    );
}