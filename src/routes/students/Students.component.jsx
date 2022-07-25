import './Students.component.scss'
import StudentPreview from '../../components/student-preview/StudentPreview.component'
import students from '../../students.json'

const Students = () => {
  return (
    <div className='students-container'>
      <h2>Students</h2>
      <div className='headings-container'>
        <h3 className='student-name-label'>Name</h3>
        <h3 className='student-level-label'>Level</h3>
      </div>
      <div className='table-container'>
        {students.map((student) => (
          <StudentPreview student={student} />
        ))}
        {/* <StudentPreview className='student-name' student={{ name: 'Gina' }} />
        <span className='student-name'>Holly</span>
        <span className='student-name'>Iman</span>
        <span className='student-name'>Justin</span>
        <span className='student-name'>Kyle</span>
        <span className='student-name'>Laura</span> */}
      </div>
    </div>
  )
}

export default Students
