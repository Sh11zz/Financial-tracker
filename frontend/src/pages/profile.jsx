import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

useEffect(() => {

    const userId =
        localStorage.getItem("user_id");

    console.log("userId:", userId);

    fetch(`http://localhost:8000/user/${userId}`)
        .then((res) => {
            console.log("status:", res.status);
            return res.json();
        })
        .then((data) => {
            console.log("data:", data);
            setUser(data);
        })
        .catch((err) => {
            console.error(err);
        });

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