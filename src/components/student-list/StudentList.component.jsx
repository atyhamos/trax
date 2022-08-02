import './StudentList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext, useState } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { BigLoading } from '../loading/Loading.component'
import { TeachersContext } from '../../contexts/TeachersContext'
import AddStudentForm from '../add-student-form/AddStudentForm.component'

const StudentList = () => {
  const { studentsMap } = useContext(StudentsContext)
  const { currentTeacher } = useContext(TeachersContext)
  const [isAddingStudent, setIsAddingStudent] = useState(false)

  const toggleModal = () => {
    setIsAddingStudent(!isAddingStudent)
  }

  return (
    <>
      {isAddingStudent && (
        <div className='modal'>
          <AddStudentForm
            closeModal={toggleModal}
            group={currentTeacher.group}
          />
        </div>
      )}
      <div className='person-container'>
        <div className='student-list-header-container'>
          <h2>Students</h2>
          {currentTeacher.isAdmin && (
            <button className='add-student-button' onClick={toggleModal}>
              +
            </button>
          )}
        </div>

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
    </>
  )
}

export default StudentList
