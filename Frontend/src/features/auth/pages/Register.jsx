import React from 'react'
import {Link} from 'react-router'
import '../style/form.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const {user , loading, handleRegister} = useAuth()
        const [username , setUsername] = useState("")
        const [password , setPassword] = useState("")
        const [email , setEmail] = useState("")
    
        async function handleSubmit(e){
            e.preventDefault()
    
            await handleRegister(username , email , password)
            console.log("user registered")
    
        }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input onInput={(e) => setUsername(e.target.value)} type="text" name='username' id='username' placeholder='Enter username'/>
                <input onInput={(e) => setEmail(e.target.value)} type="email" name='email' id='email' placeholder='Enter email'/>
                <input onInput={(e) => setPassword(e.target.value)} type="password" name='password' id='password' placeholder='Enter password'/>
                <button>Register</button>
            </form>
            <p>Already have an account? <Link className='opp-nav' to='/login'>login</Link></p>
        </div>
    </main>
  )
}

export default Register
