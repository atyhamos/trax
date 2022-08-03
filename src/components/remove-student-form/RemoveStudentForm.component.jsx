import { useState } from 'react'
import './RemoveStudentForm.component.scss'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { SmallLoading } from '../loading/Loading.component'

const RemoveStudentForm = ({ closeModal, students, children }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(0)
  const { removeStudent } = useContext(StudentsContext)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsRemoving(true)
    removeStudent(selectedStudentId).then(() => {
      setIsRemoving(false)
      closeModal()
    })
  }
  const handleChange = (event) => {
    setSelectedStudentId(Number(event.target.value))
  }
  return (
    <div className='form-container remove-student-form'>
      <span className='close-form-button' onClick={closeModal}>
        &#10005; <span>Close Form</span>
      </span>
      <h2>Remove student</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='studentId'>Name</label>
          <select
            required
            id='studentId'
            name='studentId'
            value={selectedStudentId}
            onChange={handleChange}
          >
            <option value={0} disabled hidden id={0}>
              Choose student
            </option>
            {students.map(([id, student]) => (
              <option value={id} key={id}>
                {student.name} ({student.level})
              </option>
            ))}
          </select>
        </div>
        {isRemoving ? (
          <SmallLoading />
        ) : (
          <button type='submit' className='btn'>
            Submit
          </button>
        )}
      </form>
    </div>
  )
}

export default RemoveStudentForm
