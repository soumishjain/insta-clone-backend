import { createContext, useState } from "react";
import { loginUser, registerUser } from "./services/auth.api.js";

export const AuthContext = createContext()


export function AuthProvider({children}) {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleLogin = async (username,password) => {
        setLoading(true)
        try{
           const response = await loginUser(username,password)
        setUser(response.user) 
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async (email,password,username) => {

        setLoading(true)
        try{
            const response = await registerUser(email,password,username)
            setUser(response.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    return (
        <AuthContext.Provider value={{user,loading,handleLogin,handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}