import { useNavigate } from 'react-router-dom'
import './Login.component.scss'
import {
  signInWithAuthEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import { useContext, useEffect, useState } from 'react'
import { SmallLoading } from '../../components/loading/Loading.component'
import { UserContext } from '../../contexts/UserContext'

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
      console.log(currentUser)
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
    const user = await signInWithGooglePopup()
    if (user) {
      navigate('dashboard')
    }
    setIsLoading(false)
  }

  return (
    <div className='login-container'>
      <h1>Trax</h1>
      <form onSubmit={handleSubmit}>
        <p>Efficiently track your students' learning</p>

        <input
          type='email'
          required
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
          className='text-input'
        ></input>
        <input
          type='password'
          required
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
          className='text-input'
        ></input>
        <button className='login-btn' type='submit' disabled={isLoading}>
          Login
        </button>
        {isLoading && <SmallLoading />}
        <button className='login-btn google-btn' onClick={handleGoogleSignIn}>
          <img
            className='google-logo'
            src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
          />
          <span>Sign-in with Google</span>
        </button>
      </form>
    </div>
  )
}

export default Login
