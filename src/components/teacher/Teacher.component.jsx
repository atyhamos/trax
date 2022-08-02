import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TeachersContext } from '../../contexts/TeachersContext'
import BlankPicture from '../../images/blank-profile.svg'
import EditProfileForm from '../edit-profile-form/EditProfileForm.component'
import { BigLoading } from '../loading/Loading.component'
import './Teacher.component.scss'

const Teacher = () => {
  const { teachersIdMap, currentTeacher } = useContext(TeachersContext)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const teacherId = useParams().id
  if (!teachersIdMap.size) {
    return <BigLoading />
  }
  console.log(teachersIdMap)
  const selectedTeacher = teachersIdMap.get(Number(teacherId))

  const toggleForm = () => {
    setIsEditingProfile(!isEditingProfile)
  }

  return (
    <>
      {isEditingProfile && (
        <div className='modal'>
          <EditProfileForm teacher={selectedTeacher} closeModal={toggleForm} />
        </div>
      )}
      <div className='teacher-container'>
        <img src={BlankPicture} alt={selectedTeacher.name} />
        <h2>{selectedTeacher.name}</h2>
        {currentTeacher.email === selectedTeacher.email && (
          <button onClick={toggleForm} className='btn'>
            Edit name
          </button>
        )}
      </div>
    </>
  )
}

export default Teacher
