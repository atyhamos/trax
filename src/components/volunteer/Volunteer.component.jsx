import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { VolunteersContext } from '../../contexts/VolunteersContext'
import BlankPicture from '../../images/blank-profile.svg'
import './Volunteer.component.scss'
const Volunteer = () => {
  const { volunteersMap } = useContext(VolunteersContext)
  const volunteerId = useParams().id
  const { name } = volunteersMap.get(volunteerId)
  return (
    <div className='volunteer-container'>
      <img src={BlankPicture} />
      <h2>{name}</h2>
    </div>
  )
}

export default Volunteer
