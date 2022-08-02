import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { TeachersContext } from '../../contexts/TeachersContext'
import './Dashboard.component.scss'
import { BigLoading } from '../../components/loading/Loading.component'
import { updateDisplayName } from '../../utils/firebase/firebase.utils'

const Dashboard = () => {
  const { teachersMap } = useContext(TeachersContext)
  const { currentUser } = useContext(UserContext)
  if (
    !(currentUser && teachersMap.size && teachersMap.get(currentUser.email))
  ) {
    return <BigLoading />
  }
  const name = teachersMap.get(currentUser.email).name
  if (currentUser.displayName !== name) {
    // set displayName to current teacher's name
    updateDisplayName(name)
  }
  return (
    <div className='dashboard-container'>
      <h1>
        <span>Welcome,</span> {name}
      </h1>
      <div className='preview-containers'>
        <Link className='preview-container teachers-preview' to='/teachers'>
          <h3>Teachers</h3>
          <p>View teacher info</p>
        </Link>
        <Link className='preview-container students-preview' to='/students'>
          <h3>Students</h3>
          <p>View, add, edit student info</p>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
