import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    return (
        <AuthContext.Provider value={{loading,setLoading,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}