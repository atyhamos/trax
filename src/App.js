import { Routes, Route } from 'react-router-dom'
import Login from './routes/login/Login.component'
import Dashboard from './routes/dashboard/Dashboard.component'
import Volunteers from './routes/volunteers/Volunteers.component'
import Students from './routes/students/Students.component'

function App() {
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='volunteers' element={<Volunteers />} />
      <Route path='students' element={<Students />} />
    </Routes>
  )
}

export default App
