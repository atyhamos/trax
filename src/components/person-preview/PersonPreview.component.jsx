import { Link } from 'react-router-dom'
import './PersonPreview.component.scss'

const PersonPreview = ({ person, handleAccept, handleReject }) => {
  const { name = null, email, level = false, id } = person

  // Avoid showing pointer on requests
  const linkStyles = {
    cursor: `${name ? 'pointer' : 'auto'}`,
  }

  return (
    <Link
      // Disable link if is request
      to={name ? id.toString() : ''}
      className='person-preview-container'
      tabIndex={0}
      style={linkStyles}
    >
      {/* If request, show email instead */}
      <div>{name || email}</div>

      {/* For students, show level */}
      {level && <div>{level}</div>}

      {/* For requests */}
      {!name && (
        <div>
          <button onClick={() => handleAccept(person)}>Accept</button>
          <button onClick={() => handleReject(person)}>Reject</button>
        </div>
      )}
    </Link>
  )
}

export default PersonPreview
