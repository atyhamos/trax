import { Link } from 'react-router-dom'
import './StudentPreview.component.scss'

const StudentPreview = ({ student }) => {
  const { name, level, id } = student
  return (
    <Link
      to={`students/${id}`}
      className='student-preview-container'
      tabIndex={0}
    >
      <div className='student-preview-name'>{name}</div>
      <div className='student-preview-level'>{level}</div>
    </Link>
  )
}

export default StudentPreview
