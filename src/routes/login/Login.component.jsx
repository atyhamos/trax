import { useNavigate } from 'react-router-dom'
import './Login.component.scss'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='login-container'>
      <h2>TYA Records</h2>
      <form>
        <input type='email' placeholder='Email'></input>
        <input type='password' placeholder='Password'></input>
        <button
          className='button'
          type='submit'
          onClick={() => navigate('/dashboard')}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
