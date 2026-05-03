import '../pages/login.css'
import { FaUser, FaLock, FaAt } from 'react-icons/fa'
import { useState } from 'react'

function Auth_form() {
    const [isLogin, setIsLogin] = useState(true)
    
    return(
        <div className='container'>
            <div className={`signin_signup ${isLogin ? 'login-mode' : 'register-mode'}`}>
{/* login form */}
                <form className='form signin_form'>
                    <h2 className='title'>Sign in</h2>
                    <div className='input_field'>
                        <FaUser className="icon" />
                        <input className='input_element username' id='username_input' placeholder='Username' type='text' required />
                    </div>
                    <div className='input_field'>
                        <FaLock className="icon" />
                        <input className='input_element password' id='password_input' placeholder='Password' type='password' required />
                    </div>
                    <a href='' className='forgot_btn' id='forgot_btn'>Forgot password?</a>
                    <button className='submit_btn' id='submit_btn' type='submit'>LOGIN</button>
                    <p>Don't have an account? <a className='text' href='#' onClick={(e) => { e.preventDefault(); setIsLogin(false) }}>Sign up</a></p>
                </form>
{/* register form */}
                <form className='form signup_form'>
                    <h2 className='title'>Sign up</h2>
                    <div className='input_field'>
                        <FaUser className="icon" />
                        <input className='input_element username' id='username_input' placeholder='Username' type='text' required />
                    </div>
                    <div className='input_field'>
                        <FaAt className="icon" />
                        <input className='input_element email' id='email_input' placeholder='Email' type='email' required />
                    </div>
                    <div className='input_field'>
                        <FaLock className="icon" />
                        <input className='input_element password' id='password_input' placeholder='Password' type='password' required />
                    </div>
                    <button className='submit_btn' id='submit_btn' type='submit'>Register</button>
                    <p>Already have an account? <a className='text' href='#' onClick={(e) => { e.preventDefault(); setIsLogin(true) }}>Sign in</a></p>
                </form>
            </div>
        </div>

    )
}

export default Auth_form