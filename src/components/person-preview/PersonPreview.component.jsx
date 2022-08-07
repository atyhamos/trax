import { Link } from 'react-router-dom'
import './PersonPreview.component.scss'

const PersonPreview = ({ person, request = [] }) => {
  const { name = null, email, level = false, id } = person
  const [handleAccept, handleReject] = request
  const isRequest = request.length > 0
  const teacher = { email, id }
  // Disable pointer on requests
  const linkStyles = {
    cursor: `${isRequest ? 'auto' : 'pointer'}`,
  }

  return (
    <Link
      // Disable link if is request
      to={isRequest ? '' : id.toString()}
      className='person-preview-container'
      tabIndex={0}
      style={linkStyles}
    >
      {/* If request, show email instead */}
      <div>{isRequest ? email : name}</div>

      {/* For students, show level */}
      {level && <div>{level}</div>}

      {/* For requests */}
      {isRequest && (
        <div>
          <button onClick={() => handleAccept(teacher)}>Accept</button>
          <button onClick={() => handleReject(teacher)}>Reject</button>
        </div>
      )}
    </Link>
  )
}

export default PersonPreview
