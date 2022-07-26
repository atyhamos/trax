import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudentsContext } from '../../contexts/StudentsContext'
import BlankPicture from '../../images/blank-profile.svg'
import FeedbackForm from '../feedback-form/FeedbackForm.component'
import Feedback from '../feedback/Feedback.component'
import './Student.component.scss'

const Student = () => {
  const { studentsMap } = useContext(StudentsContext)
  const [isWritingFeedback, setIsWritingFeedback] = useState(false)
  const studentId = useParams().id
  const student = studentsMap.get(studentId)
  const { name, id, level, feedbackList } = student
  const toggleForm = () => setIsWritingFeedback(!isWritingFeedback)

  return (
    <div>
      {isWritingFeedback && (
        <div className='modal'>
          <FeedbackForm name={name} id={id} closeModal={toggleForm}>
            <span className='back-form-button' onClick={toggleForm}>
              &#10005; <span>Close Form</span>
            </span>
          </FeedbackForm>
        </div>
      )}
      <div className='student-container'>
        <img src={BlankPicture} alt={name} />
        <h2>
          {name} - {level}
        </h2>
        <div className='student-feedback-container'>
          <div className='student-feedback-header'>
            <span className='description'>Comments✍️</span>
            <span className='behaviour'>👍</span>
            <span className='academics'>📚</span>
            <span className='date'>📅</span>
          </div>
          {feedbackList.map((feedback) => (
            <Feedback
              key={`${feedback.name} ${feedback.id}`}
              feedback={feedback}
            />
          ))}
        </div>
        <button className='student-feedback-button' onClick={toggleForm}>
          Write feedback
        </button>
      </div>
    </div>
  )
}

export default Student
