import { useState } from 'react'
import './Feedback.component.scss'

const Feedback = ({ feedback }) => {
  const { date, description, behaviour, academics } = feedback
  const [isExpanded, setIsExpanded] = useState(false)
  const expandHandler = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <div className='student-feedback' tabIndex={0}>
      <span className='comment-author'>Amos:</span>
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
          see more...
        </span>
      )}
    </div>
  )
}

export default Feedback