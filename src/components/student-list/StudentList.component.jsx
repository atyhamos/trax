import './StudentList.component.scss'
import StudentPreview from '../student-preview/StudentPreview.component'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'

const StudentList = () => {
  const { students } = useContext(StudentsContext)
  return (
    <div className='students-container'>
      <h2>Students</h2>
      <div className='headings-container'>
        <h3 className='student-name-label'>Name</h3>
        <h3 className='student-level-label'>Level</h3>
      </div>

      <div className='table-container'>
        {students.map((student) => (
          <StudentPreview key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default StudentList
