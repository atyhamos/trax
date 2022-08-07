import { useNavigate } from 'react-router-dom'
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import { useState } from 'react'
import { SmallLoading } from '../../components/loading/Loading.component'

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  const { email, password, confirmPassword } = formData
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    if (password !== confirmPassword) {
      setIsLoading(false)
      return alert('Passwords do not match.')
    }
    try {
      const { user } = await createAuthUserFromEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user)
      if (user) {
        navigate('../dashboard')
      }
    } catch (error) {
      setIsLoading(false)
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use.')
      } else {
        console.log('Encountered an error while creating user', error)
      }
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
        <div className='form-input'>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            required
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            className='text-input'
          ></input>
        </div>
        <button
          className='login-btn signup-btn'
          type='submit'
          disabled={isLoading}
        >
          Sign Up
        </button>
        {isLoading && <SmallLoading />}
      </form>
    </div>
  )
}

export default SignUp
