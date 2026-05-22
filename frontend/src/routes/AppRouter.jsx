import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from '../pages/home.jsx'
import Login from '../pages/login.jsx'
import Main_page from '../pages/main_page.jsx'
import Not_found from '../pages/404.jsx'
import Authenticated from '../pages/auth/authenticated.jsx'
import Unauthenticated from '../pages/auth/unauthenticated.jsx'

const AppRouter = () => {
        return(
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Not_found />} />
                <Route path='/' element={<Home />} />
                <Route path='/hello' element={<Main_page />} />
                <Route path='/login' element={<Login />} />
                <Route path='/authenticated' element={<Authenticated />} />
                <Route path='/unauthenticated' element={<Unauthenticated />} />
            </Routes>
        </BrowserRouter>)
}

export default AppRouter