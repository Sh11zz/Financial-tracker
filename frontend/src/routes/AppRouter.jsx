import { Routes, Route } from 'react-router-dom' 
import Home from '../pages/home.jsx'
import Dashboard from '../pages/dashboard.jsx'
import Not_found from '../pages/404.jsx'
import Auth_form from '../pages/auth/login_form.jsx'
import ProtectedRoute from '../pages/auth/protectedRoute.jsx'
import About from '../pages/about.jsx'
import Profile from '../pages/profile.jsx'

export default function AppRouter() {
    const username = localStorage.getItem('username')

    return(
        <Routes>
            <Route path='*' element={<Not_found />} />
            <Route path='/' element={<Home />} />
            <Route path='/hello' element={
                <ProtectedRoute>
                    <Dashboard /> 
                </ProtectedRoute>} />
            <Route path='/login' element={<Auth_form />} />
            <Route path='/about' element={<About />} />
            <Route path='/user/:username' element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>} />
        </Routes>
    )
}