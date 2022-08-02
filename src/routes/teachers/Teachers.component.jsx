import TeacherList from '../../components/teacher-list/TeacherList.component'
import Teacher from '../../components/teacher/Teacher.component'
import { Routes, Route } from 'react-router-dom'

const Teachers = () => {
  return (
    <Routes>
      <Route index element={<TeacherList />} />
      <Route path=':id' element={<Teacher />} />
    </Routes>
  )
}

export default Teachers
