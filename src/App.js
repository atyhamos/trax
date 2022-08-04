import { Routes, Route } from 'react-router-dom'
import Login from './routes/login/Login.component'
import Dashboard from './routes/dashboard/Dashboard.component'
import Teachers from './routes/teachers/Teachers.component'
import Students from './routes/students/Students.component'
import Navigation from './routes/navigation/Navigation.component'
import Admin from './routes/admin/Admin.component'
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { TeachersContext } from './contexts/TeachersContext'
import ProtectedRoute from './routes/protected-route/ProtectedRoute.component'

function App() {
  const { currentUser } = useContext(UserContext)
  const { currentTeacher } = useContext(TeachersContext)
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Login />} />

        <Route
          path='dashboard'
          element={
            <ProtectedRoute isAllowed={currentUser} redirectPath='/'>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='teachers/*'
          element={
            <ProtectedRoute isAllowed={currentUser} redirectPath='/'>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path='students/*'
          element={
            <ProtectedRoute isAllowed={currentUser} redirectPath='/'>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path='admin/*'
          element={
            <ProtectedRoute
              isAllowed={
                currentUser && currentTeacher && currentTeacher.isAdmin
              }
              redirectPath='/dashboard'
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
