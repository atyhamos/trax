import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { VolunteersContext } from '../../contexts/VolunteersContext'
import BlankPicture from '../../images/blank-profile.svg'
import { BigLoading } from '../loading/Loading.component'
import './Volunteer.component.scss'

const Volunteer = () => {
  const { volunteersMap } = useContext(VolunteersContext)
  const volunteerId = useParams().id
  if (!volunteersMap.size) {
    return <BigLoading />
  }
  const { name } = volunteersMap.get(parseInt(volunteerId))
  return (
    <div className='volunteer-container'>
      <img src={BlankPicture} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}

export default Volunteer
