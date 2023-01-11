import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TeachersContext } from '../../contexts/TeachersContext'
import BlankPicture from '../../images/blank-profile.svg'
import EditProfileForm from '../edit-profile-form/EditProfileForm.component'
import { BigLoading } from '../loading/Loading.component'
import { storage } from '../../utils/firebase/firebase.utils'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import './Teacher.component.scss'

const Teacher = () => {
  const { teachersIdMap, currentTeacher } = useContext(TeachersContext)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState(null)

  const teacherId = useParams().id
  if (!teachersIdMap.size) {
    return <BigLoading />
  }
  console.log(teachersIdMap)
  const selectedTeacher = teachersIdMap.get(teacherId)
  const { name, email } = selectedTeacher

  if (name) {
    const imageRef = ref(storage, name + email)
    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url)
        console.log('Profile picture found')
      })
      .catch((error) => {
        console.log(error.message, 'No profile picture found')
        setUrl(BlankPicture)
      })
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleSubmit = () => {
    const imageRef = ref(storage, name + email)
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url)
          })
          .catch((error) => {
            console.log(error.message, 'Error getting the image URL')
          })
        setImage(null)
      })
      .catch((error) => {
        console.log(error.message, 'Error getting the image URL')
      })
  }

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
        {!url ? <BigLoading /> : <img src={url} alt={name} />}
        {currentTeacher.email === email && (
          <div>
            <input type='file' onChange={handleImageChange} />
            <button className='btn' onClick={handleSubmit}>
              Change Picture
            </button>
          </div>
        )}

        <h2>{name}</h2>
        {currentTeacher.email === email && (
          <button onClick={toggleForm} className='btn'>
            Edit name
          </button>
        )}
      </div>
    </>
  )
}

export default Teacher
