import { createContext, useEffect, useState } from 'react'
import { getPeopleAndDocuments } from '../utils/firebase/firebase.utils'

export const VolunteersContext = createContext({
  volunteersMap: {},
  volunteersIdMap: {},
})

export const VolunteersProvider = ({ children }) => {
  const volunteersMapInitial = new Map()
  const [volunteersMap, setVolunteersMap] = useState(volunteersMapInitial)
  const [volunteersIdMap, setVolunteersIdMap] = useState(volunteersMapInitial)

  useEffect(() => {
    const getVolunteersMap = async () => {
      const volunteersMap = await getPeopleAndDocuments('volunteers')
      setVolunteersMap(volunteersMap)
      setVolunteersIdMap(
        Array.from(volunteersMap).reduce((acc, [_, volunteer]) => {
          acc.set(volunteer.id, volunteer)
          return acc
        }, new Map())
      )
    }
    getVolunteersMap()
    console.log('Running useEffect: volunteersMap')
  }, [])

  const value = { volunteersMap, volunteersIdMap }
  return (
    <VolunteersContext.Provider value={value}>
      {children}
    </VolunteersContext.Provider>
  )
}
