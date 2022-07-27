import './VolunteerList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext } from 'react'
import { VolunteersContext } from '../../contexts/VolunteersContext'
import { BigLoading } from '../loading/Loading.component'

const VolunteerList = () => {
  const { volunteersMap } = useContext(VolunteersContext)
  return (
    <div className='students-container'>
      <h2>Volunteers</h2>
      <div className='headings-container'>
        <h3 className='student-name-label'>Name</h3>
      </div>
      {!volunteersMap.size && <BigLoading />}
      <div className='table-container'>
        {Array.from(volunteersMap).map(([id, volunteer]) => (
          <PersonPreview key={volunteer.id} person={volunteer} />
        ))}
      </div>
    </div>
  )
}

export default VolunteerList
