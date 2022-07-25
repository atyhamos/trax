import { createContext, useEffect, useState } from 'react'
import VOLUNTEERS from '../volunteers.json'

export const VolunteersContext = createContext({
  volunteers: [],
  setVolunteers: () => null,
  volunteersMap: {},
})

export const VolunteersProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState(VOLUNTEERS)
  const volunteersMapInitial = new Map()
  for (const volunteer of VOLUNTEERS) {
    volunteersMapInitial.set(volunteer.id, volunteer)
  }
  const [volunteersMap, setVolunteersMap] = useState(volunteersMapInitial)
  useEffect(() => {
    const volunteersMap = new Map()
    for (const volunteer of VOLUNTEERS) {
      volunteersMap.set(volunteer.id, volunteer)
    }
    setVolunteersMap(volunteersMap)
  }, [volunteers])
  const value = { volunteers, setVolunteers, volunteersMap }
  return (
    <VolunteersContext.Provider value={value}>
      {children}
    </VolunteersContext.Provider>
  )
}
