import React, { useState } from 'react'
import '../scss/form.scss'
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {
  const[username,setusername] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  async function handleSubmit(e){

    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/register',{
      username,
      email,password
    },{
      withCredentials: true
    })
    .then((res) => {
      console.log(res.data)
    })
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name='username' 
          placeholder='Enter Name'
          onInput={(e) => setusername(e.target.value)}
          />
          <input 
          type="text" 
          name='email' 
          placeholder='Enter Email' 
          onInput={(e) => setEmail(e.target.value)} />
          <input 
          type="password" 
          name='password' 
          placeholder='Enter Password' 
          onInput={(e) => setPassword(e.target.value)} />
          <button>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>login</Link></p>
      </div>
    </main>
  )
}

export default Register
