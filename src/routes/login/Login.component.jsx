import { useNavigate } from 'react-router-dom'
import './Login.component.scss'
import { signInWithAuthEmailAndPassword } from '../../utils/firebase/firebase.utils'
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
  }
  return (
    <div className='login-container'>
      <h2>TYA Records</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          required
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
        ></input>
        <input
          type='password'
          required
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
        ></input>
        <button className='button' type='submit' disabled={isLoading}>
          Login
        </button>
        {isLoading && <SmallLoading />}
      </form>
    </div>
  )
}

export default Login
