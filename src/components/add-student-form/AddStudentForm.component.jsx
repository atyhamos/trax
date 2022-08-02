import { useState } from 'react'
import './AddStudentForm.component.scss'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'

const defaultFormData = {
  name: '',
  level: '',
}

const AddStudentForm = ({ closeModal, group, children }) => {
  const [formData, setFormData] = useState(defaultFormData)
  const { addStudent } = useContext(StudentsContext)
  const { name, level } = formData
  const handleSubmit = (e) => {
    e.preventDefault()
    addStudent(formData, group)
    closeModal()
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className='form-container'>
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
          />
        </div>

        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddStudentForm
