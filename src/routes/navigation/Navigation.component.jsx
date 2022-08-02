import { useContext } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { signOutAuthUser } from '../../utils/firebase/firebase.utils'
import './Navigation.component.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOutAuthUser().then(() => {
      navigate('/')
    })
  }
  return (
    <>
      {currentUser && (
        <div className='nav-bar'>
          <Link to='/dashboard'>
            <span className='nav-bar-hover'>Home</span>
          </Link>
          <span onClick={handleSignOut}>
            <span className='nav-bar-hover'>Sign out</span>
          </span>
        </div>
      )}
      <Outlet />
    </>
  )
}

export default Navigation
