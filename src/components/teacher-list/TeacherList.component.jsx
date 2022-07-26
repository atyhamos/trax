import './TeacherList.component.scss'
import PersonPreview from '../person-preview/PersonPreview.component'
import { useContext } from 'react'
import { TeachersContext } from '../../contexts/TeachersContext'
import { BigLoading } from '../loading/Loading.component'

const TeacherList = () => {
  const { teachersMap, currentTeacher } = useContext(TeachersContext)
  return (
    <div className='teachers-container'>
      <h2>Teachers</h2>
      <div className='headings-container'>
        <h3 className='teachers-name-label'>Name</h3>
      </div>
      {!teachersMap.size && <BigLoading />}
      <div className='table-container'>
        {currentTeacher &&
          Array.from(teachersMap).map(([id, teacher]) => {
            {
              if (teacher.group !== currentTeacher.group) return
              console.log(teacher)
              return <PersonPreview key={teacher.id} person={teacher} />
            }
          })}
      </div>
    </div>
  )
}

export default TeacherList
