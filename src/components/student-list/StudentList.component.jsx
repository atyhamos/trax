import './StudentList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext, useEffect, useState } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { BigLoading } from '../loading/Loading.component'
import { TeachersContext } from '../../contexts/TeachersContext'
import AddStudentForm from '../add-student-form/AddStudentForm.component'
import RemoveStudentForm from '../remove-student-form/RemoveStudentForm.component'
import {
  ascLevelOrder,
  ascNameOrder,
  descLevelOrder,
  descNameOrder,
} from './ListOrders.component'

const StudentList = () => {
  const { studentsMap, studentSize } = useContext(StudentsContext)
  const { currentTeacher } = useContext(TeachersContext)
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [isRemovingStudent, setIsRemovingStudent] = useState(false)
  const [currentSortOrder, setCurrentSortOrder] = useState(ascLevelOrder)
  const [sortedStudentsArray, setSortedStudentsArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSortedStudentsArray = (sortOrder) => {
    const studentsArray = Array.from(studentsMap).map(
      ([id, student]) => student
    )
    studentsArray.sort(sortOrder)
    return studentsArray
  }

  useEffect(() => {
    if (!sortedStudentsArray.length) {
      setSortedStudentsArray(getSortedStudentsArray(ascLevelOrder))
    } else {
      setSortedStudentsArray(sortedStudentsArray.sort(currentSortOrder))
    }
  }, [studentsMap, currentSortOrder])

  useEffect(() => {
    if (sortedStudentsArray.length && studentSize > 0) setIsLoading(false)
    // no students
    else if (!sortedStudentsArray.length && studentSize === 0)
      setIsLoading(false)
  }, [sortedStudentsArray])

  const toggleModalAdd = () => {
    setIsAddingStudent(!isAddingStudent)
  }
  const toggleModalRemove = () => {
    setIsRemovingStudent(!isRemovingStudent)
  }

  const sortName = () => {
    setCurrentSortOrder((previousOrder) => {
      if (previousOrder !== descNameOrder) {
        return descNameOrder
      }
      return ascNameOrder
    })
  }
  const sortLevel = () => {
    setCurrentSortOrder((previousOrder) => {
      if (previousOrder !== descLevelOrder) {
        return descLevelOrder
      }
      return ascLevelOrder
    })
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
          <h3 className='person-name-label' onClick={sortName}>
            Name
          </h3>
          <h3 className='person-level-label' onClick={sortLevel}>
            Level
          </h3>
        </div>
        {isLoading ? (
          <BigLoading />
        ) : (
          <div className='table-container'>
            {sortedStudentsArray.length ? (
              sortedStudentsArray.map((student) => (
                <PersonPreview key={student.id} person={student} />
              ))
            ) : (
              <p>No students to display.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default StudentList
