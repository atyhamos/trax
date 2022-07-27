import { createContext, useEffect, useState } from 'react'
import { getPeopleAndDocuments } from '../utils/firebase/firebase.utils'

export const VolunteersContext = createContext({
  setVolunteers: () => null,
  volunteersMap: {},
})

export const VolunteersProvider = ({ children }) => {
  const volunteersMapInitial = new Map()
  const [volunteersMap, setVolunteersMap] = useState(volunteersMapInitial)

  useEffect(() => {
    const getVolunteersMap = async () => {
      const volunteersMap = await getPeopleAndDocuments('volunteers')
      setVolunteersMap(volunteersMap)
    }
    getVolunteersMap()
    console.log('Running useEffect: volunteersMap')
  }, [])

  const value = { volunteersMap }
  return (
    <VolunteersContext.Provider value={value}>
      {children}
    </VolunteersContext.Provider>
  )
}
