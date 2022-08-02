import { createContext, useContext, useEffect, useState } from 'react'
import { getTeachers, updatePersonData } from '../utils/firebase/firebase.utils'
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
    }
    getTeachersMap()
    console.log('Running useEffect: teachersMap')
  }, [])

  useEffect(() => {
    setTeachersIdMap(
      Array.from(teachersMap).reduce((acc, [_, teacher]) => {
        acc.set(teacher.id, teacher)
        return acc
      }, new Map())
    )
  }, [teachersMap])

  useEffect(() => {
    if (teachersMap && teachersMap.size && currentUser) {
      setCurrentTeacher(teachersMap.get(currentUser.email))
    } else {
      setCurrentTeacher({})
    }
  }, [teachersMap, currentUser])

  const updateTeacherData = (teacher, newData) => {
    const updatedTeacher = { ...teacher, ...newData }
    updatePersonData('teachers', teacher, updatedTeacher)
    setTeachersMap(teachersMap.set(teacher.email, updatedTeacher))
    setCurrentTeacher(updatedTeacher)
  }

  const value = {
    teachersMap,
    teachersIdMap,
    currentTeacher,
    updateTeacherData,
  }
  return (
    <TeachersContext.Provider value={value}>
      {children}
    </TeachersContext.Provider>
  )
}
