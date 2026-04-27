import { BrowserRouter, Routes, Route }
import Login from "../pages/login.jsx"

const AppRouter = () => {
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<login />}></Route>
        </Routes>
    </BrowserRouter>
}