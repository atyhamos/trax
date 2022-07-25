import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StudentsContext } from '../../contexts/StudentsContext'
import BlankPicture from '../../images/blank-profile.svg'
import './Student.component.scss'
const Student = () => {
  const { studentsMap } = useContext(StudentsContext)
  const studentId = useParams().id
  const { name, level, feedbackList } = studentsMap.get(studentId)
  return (
    <div className='student-container'>
      <img src={BlankPicture} />
      <h2>
        {name} - {level}
      </h2>
      <div className='student-feedback-container'>
        {feedbackList.map((feedback) => {
          return (
            <div className='student-feedback' tabIndex={0}>
              <p>{feedback.description}</p>
              <span>{feedback.date}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Student
