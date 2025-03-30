import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
    const navigate = useNavigate();

    const notAuthorized = () => {
        if(!currentUser) {
            navigate("/");
        }
    };
    
    const alreadyLoggedIn = () => {
        if(currentUser) {
            navigate("/");
        }
    };

    const login = async (inputs) => {
        const res = await axiosInstance.post(`/auth/login`, inputs);
        setCurrentUser(res.data);
    };

    const logout = async () => {
        await axiosInstance.post(`/auth/logout/`, {});
        setCurrentUser(null);
        navigate("/");
    };

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, notAuthorized, alreadyLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};