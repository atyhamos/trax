import { useNavigate } from 'react-router-dom'
import { BigLoading } from '../../components/loading/Loading.component'

const ProtectedRoute = ({
  isAllowed,
  loading,
  redirectPath = '/',
  children,
}) => {
  const navigate = useNavigate()

  if (loading) return <BigLoading />
  if (!isAllowed) navigate(redirectPath)

  return children
}

export default ProtectedRoute
