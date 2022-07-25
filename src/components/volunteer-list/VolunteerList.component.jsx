import './VolunteerList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext } from 'react'
import { VolunteersContext } from '../../contexts/VolunteersContext'

const VolunteerList = () => {
  const { volunteers } = useContext(VolunteersContext)
  return (
    <div className='students-container'>
      <h2>Volunteers</h2>
      <div className='headings-container'>
        <h3 className='student-name-label'>Name</h3>
      </div>

      <div className='table-container'>
        {volunteers.map((volunteer) => (
          <PersonPreview key={volunteer.id} person={volunteer} />
        ))}
      </div>
    </div>
  )
}

export default VolunteerList
