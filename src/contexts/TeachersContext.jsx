import { createContext, useContext, useEffect, useState } from 'react'
import { getTeachers } from '../utils/firebase/firebase.utils'
import { UserContext } from './UserContext'

export const TeachersContext = createContext({
  teachersMap: {},
  teachersIdMap: {},
  currentTeacher: {},
})

export const TeachersProvider = ({ children }) => {
  const teachersMapInitial = new Map()
  const [teachersMap, setTeachersMap] = useState(teachersMapInitial)
  const [teachersIdMap, setTeachersIdMap] = useState(teachersMapInitial)
  const [currentTeacher, setCurrentTeacher] = useState({})
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    const getTeachersMap = async () => {
      const teachersMap = await getTeachers()
      setTeachersMap(teachersMap)
      setTeachersIdMap(
        Array.from(teachersMap).reduce((acc, [_, teacher]) => {
          acc.set(teacher.id, teacher)
          return acc
        }, new Map())
      )
    }
    getTeachersMap()
    console.log('Running useEffect: teachersMap')
  }, [])

  useEffect(() => {
    if (teachersMap && teachersMap.size && currentUser) {
      setCurrentTeacher(teachersMap.get(currentUser.email))
    } else {
      setCurrentTeacher({})
    }
  }, [teachersMap, currentUser])

  const value = { teachersMap, teachersIdMap, currentTeacher }
  return (
    <TeachersContext.Provider value={value}>
      {children}
    </TeachersContext.Provider>
  )
}
