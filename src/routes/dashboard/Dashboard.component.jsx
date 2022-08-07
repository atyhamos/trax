import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TeachersContext } from '../../contexts/TeachersContext'
import './Dashboard.component.scss'
import { BigLoading } from '../../components/loading/Loading.component'
import GroupForm from '../../components/group-form/GroupForm.component'

const Dashboard = () => {
  const { currentTeacher } = useContext(TeachersContext)
  if (!currentTeacher || !Object.keys(currentTeacher).length) {
    return <BigLoading />
  }
  const { name, group } = currentTeacher
  return (
    <>
      {currentTeacher.group ? (
        <div className='body-container dashboard-container'>
          <h1>
            <span>Welcome,</span> {name}
          </h1>
          <h2 className='group-name'>Group: {group}</h2>
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
      ) : (
        <GroupForm teacher={currentTeacher} />
      )}
    </>
  )
}

export default Dashboard
