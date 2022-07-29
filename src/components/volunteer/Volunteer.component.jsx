import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { VolunteersContext } from '../../contexts/VolunteersContext'
import BlankPicture from '../../images/blank-profile.svg'
import { BigLoading } from '../loading/Loading.component'
import './Volunteer.component.scss'

const Volunteer = () => {
  const { volunteersIdMap } = useContext(VolunteersContext)
  const volunteerId = useParams().id
  if (!volunteersIdMap.size) {
    return <BigLoading />
  }
  const name = volunteersIdMap.get(Number(volunteerId)).name
  return (
    <div className='volunteer-container'>
      <img src={BlankPicture} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}

export default Volunteer
