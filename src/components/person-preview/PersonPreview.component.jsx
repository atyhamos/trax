import { Link } from 'react-router-dom'
import './PersonPreview.component.scss'

const PersonPreview = ({ person }) => {
  const { name, level = false, id } = person
  return (
    <Link to={id.toString()} className='person-preview-container' tabIndex={0}>
      <div>{name}</div>
      {level && <div>{level}</div>}
    </Link>
  )
}

export default PersonPreview
