import { createContext, useEffect, useState } from 'react'
import STUDENTS from '../students.json'

export const StudentsContext = createContext({
  students: [],
  setStudents: () => null,
  studentsMap: {},
  addFeedback: () => null,
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
    for (const student of students) {
      studentsMap.set(student.id, student)
    }
    setStudentsMap(studentsMap)
  }, [students])

  const addFeedback = (studentId, description, behaviour, academics, date) => {
    const student = studentsMap.get(studentId)
    const studentComments = student.feedbackList
    const newStudent = {
      ...student,
      feedbackList: [
        { description, behaviour, academics, date },
        ...studentComments,
      ],
    }
    const newStudents = students.map((student) =>
      student.id === studentId ? newStudent : student
    )
    setStudents(newStudents)
  }

  const value = { students, setStudents, studentsMap, addFeedback }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
