import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BigLoading } from '../../components/loading/Loading.component'
import { UserContext } from '../../contexts/UserContext'

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  // setTimeout(() => {
  //   if (!currentUser) navigate(redirectPath)
  // }, 5000)
  if (!currentUser) return <BigLoading />
  return children
}

export default ProtectedRoute
