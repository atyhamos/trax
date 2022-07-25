import VolunteerList from '../../components/volunteer-list/VolunteerList.component'
import Volunteer from '../../components/volunteer/Volunteer.component'
import { Routes, Route } from 'react-router-dom'

const Volunteers = () => {
  return (
    <Routes>
      <Route index element={<VolunteerList />} />
      <Route path=':id' element={<Volunteer />} />
    </Routes>
  )
}

export default Volunteers
