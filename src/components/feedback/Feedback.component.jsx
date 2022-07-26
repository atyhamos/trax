import './Feedback.component.scss'

const Feedback = ({ feedback }) => {
  const { date, description, behaviour, academics } = feedback
  return (
    <div className='student-feedback' tabIndex={0}>
      <p className='description'>{description}</p>
      <span className='behaviour hovertext'>{behaviour}</span>
      <span className='academics'>{academics}</span>
      <span className='date'>{date}</span>
    </div>
  )
}

export default Feedback
