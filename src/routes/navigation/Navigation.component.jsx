import { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { TeachersContext } from '../../contexts/TeachersContext'
import { UserContext } from '../../contexts/UserContext'
import { signOutAuthUser } from '../../utils/firebase/firebase.utils'
import './Navigation.component.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { currentTeacher } = useContext(TeachersContext)
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
          {currentTeacher && currentTeacher.isAdmin && (
            <Link to='/admin'>
              <span className='nav-bar-hover'>Admin</span>
            </Link>
          )}
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
