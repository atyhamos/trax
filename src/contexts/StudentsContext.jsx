import { createContext, useEffect, useState } from 'react'
import STUDENTS from '../students.json'

export const StudentsContext = createContext({
  students: [],
  setStudents: () => null,
  studentsMap: {},
})

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState(STUDENTS)
  const studentsMapInitial = new Map()
  for (const student of STUDENTS) {
    studentsMapInitial.set(student.id, student)
  }
  const [studentsMap, setStudentsMap] = useState(studentsMapInitial)
  useEffect(() => {
    const studentsMap = new Map()
    for (const student of STUDENTS) {
      studentsMap.set(student.id, student)
    }
    setStudentsMap(studentsMap)
  }, [students])
  const value = { students, setStudents, studentsMap }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
