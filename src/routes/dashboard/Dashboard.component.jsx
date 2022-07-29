import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { VolunteersContext } from '../../contexts/VolunteersContext'
import './Dashboard.component.scss'
import { BigLoading } from '../../components/loading/Loading.component'
import { updateDisplayName } from '../../utils/firebase/firebase.utils'

const Dashboard = () => {
  const { volunteersMap } = useContext(VolunteersContext)
  const { currentUser } = useContext(UserContext)
  if (
    !(currentUser && volunteersMap.size && volunteersMap.get(currentUser.email))
  ) {
    return <BigLoading />
  }
  const name = volunteersMap.get(currentUser.email).name
  if (currentUser.displayName !== name) {
    // set displayName to current volunteer's name
    updateDisplayName(name)
  }
  return (
    <div className='dashboard-container'>
      <h1>
        <span>Welcome,</span> {name}
      </h1>
      <div className='preview-containers'>
        <Link className='preview-container volunteers-preview' to='/volunteers'>
          <h3>Volunteers</h3>
          <p>View volunteer info</p>
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
