import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { signOutAuthUser } from '../../utils/firebase/firebase.utils'
import './Navigation.component.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  return (
    <>
      {currentUser && (
        <div className='nav-bar'>
          <Link to='/dashboard'>
            <span className='nav-bar-hover'>Home</span>
          </Link>
          <Link to='/' onClick={signOutAuthUser}>
            <span className='nav-bar-hover'>Sign out</span>
          </Link>
        </div>
      )}
      <Outlet />
    </>
  )
}

export default Navigation
