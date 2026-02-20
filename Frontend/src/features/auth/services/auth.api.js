import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials : true
})

export async function registerUser(email,password,username){

    try{
        const response = await api.post('/register',{
            email,
            password,
            username
        })
        return response.data
    }catch(err){
        throw err
    }
}

export async function loginUser(username,password){
    try{
        const response = await api.post('/login',{
            username,
            password
        })
        return response.data
    }catch(err){
        throw err
    }
}

export async function getMyDetails() {
    try{
        const response = await api.get("/get-my-details")
        return response.data
    }catch(err){
        throw err
    }
}