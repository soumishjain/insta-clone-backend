import React from 'react'
import '../scss/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")

  const {handleLogin,loading} = useAuth()

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  async function handleSubmit(e){
    e.preventDefault()

    handleLogin(username,password)
    .then(res => {
      console.log(res)
   })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e) => setUsername(e.target.value)} type="text" name='username' placeholder='Enter Name ' />
          <input onInput={(e) => setPassword(e.target.value)} type="password" name='password' placeholder='Enter Password' />
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>sign up</Link></p>
      </div>
    </main>
  )
}

export default Login
