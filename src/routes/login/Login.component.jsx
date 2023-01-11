import { useNavigate } from 'react-router-dom'
import './Login.component.scss'
import {
  signInWithAuthEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import { useContext, useEffect, useState } from 'react'
import { SmallLoading } from '../../components/loading/Loading.component'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

const initialFormData = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser)
      navigate('dashboard')
    }
  })

  const { email, password } = formData
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const user = await signInWithAuthEmailAndPassword(email, password)
    if (user) {
      navigate('dashboard')
    }
    setIsLoading(false)
  }

  const handleGoogleSignIn = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const user = await signInWithGooglePopup()
      if (user) {
        navigate('dashboard')
      }
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        alert(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='auth-container body-container'>
      <div className='logo' />
      <form onSubmit={handleSubmit}>
        <h2>Track your students' progress, easily.</h2>
        <div className='form-input'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            required
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            className='text-input'
          ></input>
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            required
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            className='text-input'
          ></input>
        </div>
        {isLoading ? (
          <SmallLoading />
        ) : (
          <>
            <button className='login-btn' type='submit' disabled={isLoading}>
              Login
            </button>
            <button
              className='login-btn google-btn'
              onClick={handleGoogleSignIn}
            >
              <img
                className='google-logo'
                src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
                alt='google icon'
              />
              <span>Sign-in with Google</span>
            </button>
            <Link to='sign-up' className='login-btn signup-btn'>
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </form>
    </div>
  )
}

export default Login
