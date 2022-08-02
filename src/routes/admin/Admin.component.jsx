import { Routes, Route } from 'react-router-dom'
import RequestList from '../../components/request-list/RequestList.component'

const Admin = () => {
  return (
    <Routes>
      <Route index element={<RequestList />} />
    </Routes>
  )
}

export default Admin
