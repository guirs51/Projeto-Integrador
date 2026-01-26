import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "./locationContext";

interface InterfaceAuthContext {
    userId: string | null,
    login: (id: string) => void,
    logout: () => void;
}

const AuthContext = createContext<InterfaceAuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState(() => localStorage.getItem("userId"))
    const {clearLocation} = useLocation()   
    const navigate = useNavigate()

    const login = (id: string) => {
        setUserId(id)
        localStorage.setItem("userId", id)
    }

    const logout = () => {
        setUserId(null)
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        clearLocation()
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvide");
    return ctx;
};