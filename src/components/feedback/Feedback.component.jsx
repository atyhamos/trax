import { useContext, useState } from 'react'
import { TeachersContext } from '../../contexts/TeachersContext'
import { BigLoading } from '../loading/Loading.component'
import './Feedback.component.scss'

const Feedback = ({ feedback, toggleModal }) => {
  const { date, description, behaviour, academics, teacher } = feedback
  const [isExpanded, setIsExpanded] = useState(false)
  const { teachersMap, currentTeacher } = useContext(TeachersContext)

  if (!teachersMap.size) {
    return <BigLoading />
  }
  const expandHandler = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className='student-feedback' tabIndex={0}>
        <span className='comment-author'>
          {teachersMap.get(teacher).name}:{' '}
        </span>
        {!isExpanded ? (
          <p className='description'>
            {description ? description.slice(0, 49) : 'No comment'}
          </p>
        ) : (
          <p className='description description-full'>{description}</p>
        )}
        <span className='behaviour hovertext'>{behaviour}</span>
        <span className='academics'>{academics}</span>
        <span className='date'>{date}</span>
        {description.length > 50 && (
          <span className='expand' onClick={expandHandler}>
            {isExpanded ? '' : 'see more...'}
          </span>
        )}
        {currentTeacher && currentTeacher.isAdmin && (
          <span id='delete-feedback' onClick={toggleModal}>
            Delete
          </span>
        )}
      </div>
    </>
  )
}

export default Feedback
