import './StudentList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { BigLoading } from '../loading/Loading.component'

const StudentList = () => {
  const { studentsMap } = useContext(StudentsContext)

  return (
    <div className='person-container'>
      <h2>Students</h2>
      <div className='headings-container'>
        <h3 className='person-name-label'>Name</h3>
        <h3 className='person-level-label'>Level</h3>
      </div>
      {!studentsMap.size && <BigLoading />}
      <div className='table-container'>
        {Array.from(studentsMap).map(([id, student]) => (
          <PersonPreview key={id} person={student} />
        ))}
      </div>
    </div>
  )
}

export default StudentList
