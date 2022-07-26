import { useState } from 'react'
import './FeedbackForm.component.scss'
import { useContext } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'

const defaultFormData = {
  behaviour: '3',
  academics: '3',
  comment: '',
  date: new Date().toISOString().slice(0, 10), // today's date
}

const FeedbackForm = ({ name, id, closeModal, children }) => {
  const [formData, setFormData] = useState(defaultFormData)
  const { addFeedback: addComment } = useContext(StudentsContext)
  const { behaviour, academics, comment, date } = formData
  const handleSubmit = (e) => {
    e.preventDefault()
    addComment(id, comment, behaviour, academics, date)
    closeModal()
  }
  console.log(date)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className='feedback-form-container'>
      {children}

      <h2>Feedback Form for {name}</h2>

      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            required
            value={date}
            name='date'
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='behaviour'>Behaviour</label>
          <div className='range-marker'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <input
            type='range'
            required
            id='behaviour'
            min='1'
            max='5'
            value={behaviour}
            name='behaviour'
            onChange={handleChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='academics'>Academics</label>
          <div className='range-marker'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <input
            type='range'
            required
            id='academics'
            min='1'
            max='5'
            value={academics}
            name='academics'
            onChange={handleChange}
          />
        </div>
        <label htmlFor='comment'>Any other comment?</label>
        <textarea
          id='comment'
          placeholder='Write a few comments'
          value={comment}
          name='comment'
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default FeedbackForm
