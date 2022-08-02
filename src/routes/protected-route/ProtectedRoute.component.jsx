import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  const navigate = useNavigate()
  if (!isAllowed) {
    return navigate(redirectPath)
  }
  return children
}

export default ProtectedRoute
