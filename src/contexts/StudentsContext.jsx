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
    // Rebuild student map
    const studentsMap = new Map()
    for (const student of students) {
      studentsMap.set(student.id, student)
    }
    setStudentsMap(studentsMap)
  }, [students])

  const calculateScores = (
    student,
    studentComments,
    newBehaviour,
    newAcademics
  ) => {
    if (student.averageAcademics && student.averageBehaviour) {
      // existing score, multiply for faster operation
      const totalBehaviourScore =
        student.averageBehaviour * studentComments.length + Number(newBehaviour)
      const totalAcademicScore =
        student.averageAcademics * studentComments.length + Number(newAcademics)
      const newAverageBehaviour =
        totalBehaviourScore / (studentComments.length + 1)
      const newAverageAcademics =
        totalAcademicScore / (studentComments.length + 1)
      return [newAverageBehaviour, newAverageAcademics]
    } else {
      // calculate from scratch
      let totalBehaviourScore = Number(newBehaviour)
      let totalAcademicScore = Number(newAcademics)
      studentComments.forEach((feedback) => {
        totalBehaviourScore += feedback.behaviour
        totalAcademicScore += feedback.academics
      })
      const averageBehaviour =
        totalBehaviourScore / (studentComments.length + 1)
      const averageAcademics = totalAcademicScore / (studentComments.length + 1)
      return [averageBehaviour, averageAcademics]
    }
  }

  const addFeedback = (studentId, description, behaviour, academics, date) => {
    const student = studentsMap.get(studentId)
    const studentComments = student.feedbackList
    const id = studentComments.length + 1
    const [averageBehaviour, averageAcademics] = calculateScores(
      student,
      studentComments,
      behaviour,
      academics
    )

    const newStudent = {
      ...student,
      feedbackList: [
        { description, behaviour, academics, date, id },
        ...studentComments,
      ],
      averageBehaviour,
      averageAcademics,
    }
    console.log(newStudent)
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
