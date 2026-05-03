import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Login from '../pages/login.jsx'
import Welcome from '../pages/welcome.jsx'


const AppRouter = () => {
        return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>)
}

export default AppRouter