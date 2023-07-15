import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages";
import Login from "@/pages/login";
import Cadastro from "@/pages/register";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
    )
}