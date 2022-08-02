import React, { useContext, useState } from 'react'
import { TeachersContext } from '../../contexts/TeachersContext'
import './EditProfileForm.component.scss'

const EditProfileForm = ({ teacher, closeModal }) => {
  const [formData, setFormData] = useState({ name: '' })
  const { updateTeacherData } = useContext(TeachersContext)
  const { name } = formData

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTeacherData(teacher, { name: name })
    closeModal()
  }

  return (
    <form
      className='form-container edit-name-container'
      onSubmit={handleSubmit}
    >
      <span className='close-form-button' onClick={closeModal}>
        &#10005; <span>Close Form</span>
      </span>
      <br />
      <div className='input-container'>
        <label htmlFor='name'>Name</label>
        <br />
        <input
          name='name'
          type='text'
          required
          placeholder='Enter name'
          onChange={handleChange}
          className='text-input'
          value={name}
        ></input>
      </div>
      <button type='submit' className='btn'>
        Submit
      </button>
    </form>
  )
}

export default EditProfileForm
