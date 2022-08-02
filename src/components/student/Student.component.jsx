import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StudentsContext } from '../../contexts/StudentsContext'
import BlankPicture from '../../images/blank-profile.svg'
import FeedbackForm from '../feedback-form/FeedbackForm.component'
import Feedback from '../feedback/Feedback.component'
import { BigLoading } from '../loading/Loading.component'
import './Student.component.scss'

const Student = () => {
  const { studentsMap, deleteFeedbackFromStudent } = useContext(StudentsContext)
  const [isDeletingFeedback, setIsDeletingFeedback] = useState(false)
  const [isWritingFeedback, setIsWritingFeedback] = useState(false)
  const [feedbackToDelete, setFeedbackToDelete] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const studentId = useParams().id
  const student = studentsMap.get(parseInt(studentId))
  if (!student) {
    return <BigLoading />
  }
  const { name, id, level, feedbackList, averageBehaviour, averageAcademics } =
    student

  const toggleForm = () => setIsWritingFeedback(!isWritingFeedback)
  const toggleModal = (feedback) => {
    setIsDeletingFeedback(!isDeletingFeedback)
    setFeedbackToDelete(feedback)
  }

  const deleteFeedback = () => {
    setIsLoading(true)
    deleteFeedbackFromStudent(student, feedbackToDelete).then(() => {
      toggleModal()
      setIsLoading(false)
    })
  }

  if (isLoading) return <BigLoading />

  return (
    <div>
      {isWritingFeedback && (
        <div className='modal'>
          <FeedbackForm name={name} id={id} closeModal={toggleForm} />
        </div>
      )}
      {isDeletingFeedback && (
        <div className='modal'>
          <div className='delete-confirm-container'>
            <h2>Are you sure you want to delete this comment?</h2>
            <p>It cannot be undone.</p>
            <button className='btn' onClick={deleteFeedback}>
              Delete
            </button>
          </div>
        </div>
      )}
      <div className='student-container'>
        <div className='student-info-container'>
          <img src={BlankPicture} alt={name} />
          <h2>
            {name} - {level}
          </h2>
          <div className='average-score'>
            👍Behaviour: <span>{averageBehaviour.toFixed(2)}/5</span>
          </div>
          <div className='average-score'>
            📚Academics: <span>{averageAcademics.toFixed(2)}/5</span>
          </div>
          <button className='student-feedback-button' onClick={toggleForm}>
            Write feedback
          </button>
        </div>
        <div className='student-feedback-container'>
          <div className='student-feedback-header'>
            <span className='description'>Comments✍️</span>
            <span className='behaviour'>👍</span>
            <span className='academics'>📚</span>
            <span className='date'>📅</span>
          </div>
          {feedbackList.map((feedback) => {
            return (
              <Feedback
                key={`${name} ${feedback.id}`}
                feedback={feedback}
                toggleModal={() => toggleModal(feedback)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Student
