import StudentList from '../../components/student-list/StudentList.component'
import Student from '../../components/student/Student.component'
import { Routes, Route } from 'react-router-dom'

const Students = () => {
  return (
    <Routes>
      <Route index element={<StudentList />} />
      <Route path=':id' element={<Student />} />
    </Routes>
  )
}

export default Students
