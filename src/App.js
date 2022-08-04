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
  const { currentUser, signingIn } = useContext(UserContext)
  const { currentTeacher } = useContext(TeachersContext)
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Login />} />
        <Route
          path='sign-up'
          element={
            <ProtectedRoute
              isAllowed={currentUser}
              loading={signingIn}
              redirectPath='/'
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='dashboard'
          element={
            <ProtectedRoute
              isAllowed={currentUser}
              loading={signingIn}
              redirectPath='/'
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='teachers/*'
          element={
            <ProtectedRoute
              isAllowed={currentUser}
              loading={signingIn}
              redirectPath='/'
            >
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path='students/*'
          element={
            <ProtectedRoute
              isAllowed={currentUser}
              loading={signingIn}
              redirectPath='/'
            >
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
              loading={signingIn}
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
