import './RequestList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { BigLoading } from '../loading/Loading.component'
import { useContext, useEffect, useState } from 'react'
import { TeachersContext } from '../../contexts/TeachersContext'
import {
  getRequests,
  removeRequestFromGroup,
} from '../../utils/firebase/firebase.utils'

const RequestList = () => {
  const { currentTeacher, updateTeacherData } = useContext(TeachersContext)
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (Object.keys(currentTeacher).length) {
      console.log(currentTeacher)
      getRequests(currentTeacher.group).then((requests) => {
        setRequests(requests)
        setIsLoading(false)
      })
    }
  }, [currentTeacher])

  const handleAccept = (teacher) => {
    console.log('accepting teacher.')
    updateTeacherData(teacher, { group: currentTeacher.group })
    setRequests(removeRequestFromGroup(teacher.email, currentTeacher.group))
  }

  const handleReject = (teacher) => {
    console.log('rejecting teacher')
    setRequests(removeRequestFromGroup(teacher.email, currentTeacher.group))
  }

  return (
    <div className='person-container'>
      <h2>Requests</h2>
      <div className='headings-container'>
        <h3 className='person-name-label'>Name</h3>
      </div>
      {/* {!teachersMap.size && <BigLoading />} */}
      <div className='table-container'>
        {isLoading ? (
          <BigLoading />
        ) : (
          requests.map((teacher) => (
            <PersonPreview
              key={teacher.id}
              person={teacher}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RequestList
