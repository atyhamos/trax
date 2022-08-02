import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TeachersContext } from '../../contexts/TeachersContext'
import BlankPicture from '../../images/blank-profile.svg'
import { BigLoading } from '../loading/Loading.component'
import './Teacher.component.scss'

const Teacher = () => {
  const { teachersIdMap } = useContext(TeachersContext)
  const teacherId = useParams().id
  if (!teachersIdMap.size) {
    return <BigLoading />
  }
  const name = teachersIdMap.get(Number(teacherId)).name
  return (
    <div className='teacher-container'>
      <img src={BlankPicture} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}

export default Teacher
