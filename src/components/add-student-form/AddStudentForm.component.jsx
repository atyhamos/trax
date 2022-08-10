import { useState } from 'react'
import './AddStudentForm.component.scss'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { SmallLoading } from '../loading/Loading.component'

const defaultFormData = {
  name: '',
  level: '',
}

const AddStudentForm = ({ closeModal, group, children }) => {
  const [formData, setFormData] = useState(defaultFormData)
  const { addStudent } = useContext(StudentsContext)
  const { name, level } = formData
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addStudent(formData, group).then(() => {
      closeModal()
      setIsLoading(false)
    })
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className='form-container add-student'>
      <span className='close-form-button' onClick={closeModal}>
        &#10005; <span>Close Form</span>
      </span>
      {children}

      <h2>Add student</h2>

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            required
            value={name}
            name='name'
            onChange={handleChange}
            className='text-input'
            placeholder='Enter name'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='level'>Level</label>
          <input
            type='text'
            required
            id='level'
            value={level}
            name='level'
            onChange={handleChange}
            className='text-input'
            placeholder='Enter level (K1, P1 etc)'
          />
        </div>

        {isLoading ? (
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

export default AddStudentForm
