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
    setIsLoading(true)
    console.log('accepting teacher.')
    removeRequestFromGroup(teacher.email, currentTeacher.group)
      .then((requests) => setRequests(requests))
      .then(() => {
        updateTeacherData(teacher, { group: currentTeacher.group })
      })
      .then(() => setIsLoading(false))
  }

  const handleReject = (teacher) => {
    setIsLoading(true)
    console.log('rejecting teacher')
    removeRequestFromGroup(teacher.email, currentTeacher.group)
      .then((requests) => setRequests(requests))
      .then(() => setIsLoading(false))
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
        ) : requests.length > 0 ? (
          requests.map((teacher) => (
            <PersonPreview
              key={teacher.id}
              person={teacher}
              request={[handleAccept, handleReject]}
            />
          ))
        ) : (
          <p>There are no current requests to join your group.</p>
        )}
      </div>
    </div>
  )
}

export default RequestList
