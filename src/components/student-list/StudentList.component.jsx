import './StudentList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext, useState } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { BigLoading } from '../loading/Loading.component'
import { TeachersContext } from '../../contexts/TeachersContext'
import AddStudentForm from '../add-student-form/AddStudentForm.component'
import RemoveStudentForm from '../remove-student-form/RemoveStudentForm.component'

const StudentList = () => {
  const { studentsMap } = useContext(StudentsContext)
  const { currentTeacher } = useContext(TeachersContext)
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [isRemovingStudent, setIsRemovingStudent] = useState(false)

  const toggleModalAdd = () => {
    setIsAddingStudent(!isAddingStudent)
  }
  const toggleModalRemove = () => {
    setIsRemovingStudent(!isRemovingStudent)
  }

  return (
    <>
      {isAddingStudent && (
        <div className='modal'>
          <AddStudentForm
            closeModal={toggleModalAdd}
            group={currentTeacher.group}
          />
        </div>
      )}
      {isRemovingStudent && (
        <div className='modal'>
          <RemoveStudentForm
            closeModal={toggleModalRemove}
            group={currentTeacher.group}
            students={Array.from(studentsMap)}
          />
        </div>
      )}
      <div className='person-container'>
        <div className='student-list-header-container'>
          <h2>Students</h2>
          {currentTeacher.isAdmin && (
            <div className='buttons-container'>
              <button
                className='list-button add-student-button'
                onClick={toggleModalAdd}
              >
                +
              </button>
              <button
                className='list-button remove-student-button'
                onClick={toggleModalRemove}
              >
                -
              </button>
            </div>
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
