import styles from '../login.module.css'
import { FaUser, FaLock, FaAt } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './auth.service'
import { useSearchParams } from 'react-router-dom'

export default function Auth_form() {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')

    const [isLogin, setIsLogin] = useState(mode !== 'register')
    const [prevMode, setPrevMode] = useState(mode)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    // Sync the form with ?mode= when the user navigates between login/register links
    if (mode !== prevMode) {
        setPrevMode(mode)
        setIsLogin(mode !== 'register')
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = await loginUser(
            username,
            password
        );

        if (user.error) {
            alert(user.error);
            return;
        }

        localStorage.setItem(
            "user_id",
            user.user_id
        );

        localStorage.setItem(
            "username",
            user.username
        );

        navigate("/hello");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await registerUser({
            username,
            email,
            password
        });

        if (response.error) {
            alert(response.error);
            return;
        }

        alert("Registration successful");
        setIsLogin(true);
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={`${styles.signin_signup} ${isLogin ? styles["login-mode"] : styles["register-mode"]}`}>
    {/* login form */}
                    <form className={`${styles.form} ${styles.signin_form}`}>
                        <h2 className={styles.title}>Sign in</h2>
                        <div className={styles.input_field}>
                            <FaUser className={styles.icon} />
                            <input className={`${styles.input_element} ${styles.username}`} id='username_input' placeholder='Username' type='text'
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={styles.input_field}>
                            <FaLock className={styles.icon} />
                            <input className={`${styles.input_element} ${styles.password}`} id='password_input' placeholder='Password' type='password' 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <a href='' className={styles.forgot_btn} id='forgot_btn'>Forgot password?</a>
                        <button onClick={handleLogin} className={styles.submit_btn} id='submit_btn' type='button'>LOGIN</button>
                        <p>Don't have an account? <a className={styles.text} href='#' onClick={(e) => { e.preventDefault(); setIsLogin(false) }}>Sign up</a></p>
                    </form>
    {/* register form */}
                    <form className={`${styles.form} ${styles.signup_form}`} onSubmit={handleRegister}>
                        <h2 className={styles.title}>Sign up</h2>
                        <div className={styles.input_field}>
                            <FaUser className={styles.icon} />
                            <input className={`${styles.input_element} ${styles.username}`} id='username_input' placeholder='Username' type='text' required
                            onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={styles.input_field}>
                            <FaAt className={styles.icon} />
                            <input className={`${styles.input_element} ${styles.email}`} id='email_input' placeholder='Email' type='email' required
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.input_field}>
                            <FaLock className={styles.icon} />
                            <input className={`${styles.input_element} ${styles.password}`} id='password_input' placeholder='Password' type='password' required
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className={styles.submit_btn} id='submit_btn' type='submit'>Register</button>
                        <p>Already have an account? <a className={styles.text} href='#' onClick={(e) => { e.preventDefault(); setIsLogin(true) }}>Sign in</a></p>
                    </form>
                </div>
            </div>
        </div>

        )
}