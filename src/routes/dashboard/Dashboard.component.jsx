import { Link } from 'react-router-dom'
import './Dashboard.component.scss'

const Dashboard = () => {
  
  return (
    <div className='dashboard-container'>
      <h1>
        <span>Welcome,</span> User
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
