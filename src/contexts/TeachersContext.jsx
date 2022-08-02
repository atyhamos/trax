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

  const getTeachersMap = async () => {
    const teachersMap = await getTeachers()
    setTeachersMap(teachersMap)
  }
  useEffect(() => {
    setTimeout(getTeachersMap, 3000)
    console.log('Running useEffect: teachersMap')
  }, [currentUser])

  useEffect(() => {
    const newTeachersIdMap = Array.from(teachersMap).reduce(
      (acc, [_, teacher]) => {
        acc.set(teacher.id, teacher)
        return acc
      },
      new Map()
    )
    setTeachersIdMap(newTeachersIdMap)
    console.log('new teachersIdMap')
    console.log(newTeachersIdMap)
  }, [teachersMap])

  useEffect(() => {
    if (teachersMap && teachersMap.size && currentUser) {
      setCurrentTeacher(teachersMap.get(currentUser.email))
    } else {
      console.log('resetting current teacher')
      setCurrentTeacher({})
    }
  }, [teachersMap, currentUser])

  const updateTeacherData = (teacher, newData) => {
    const updatedTeacher = { ...teacher, ...newData }
    updatePersonData('teachers', teacher, updatedTeacher)
    getTeachersMap()
    console.log(`new teachersMap`)
  }

  const resetTeachersContext = () => {
    setTeachersMap(teachersMapInitial)
  }

  const value = {
    teachersMap,
    teachersIdMap,
    currentTeacher,
    updateTeacherData,
    resetTeachersContext,
  }
  return (
    <TeachersContext.Provider value={value}>
      {children}
    </TeachersContext.Provider>
  )
}
