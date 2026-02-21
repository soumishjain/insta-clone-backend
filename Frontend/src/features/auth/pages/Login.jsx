import '../style/form.scss'
import {Link, useNavigate} from 'react-router'
import { useState } from 'react'
import {useAuth} from '../hooks/useAuth.js'


const Login = () => {

    const {user , loading, handleLogin} = useAuth()
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        await handleLogin(username , password)
        console.log("user LoggedIn")
        navigate('/')
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input onInput={(e) => setUsername(e.target.value)} type="text" name='username' id='username' placeholder='Enter username'/>
                <input onInput={(e) => setPassword(e.target.value)} type="password" name='password' id='password' placeholder='Enter password'/>
                <button>Login</button>
            </form>
            <p>Don't have an account? <Link className='opp-nav' to='/register'>register</Link></p>
        </div>
    </main>
  )
}

export default Login