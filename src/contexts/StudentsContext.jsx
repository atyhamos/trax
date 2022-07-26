import { createContext, useEffect, useState } from 'react'
import {
  addFeedbackToStudent,
  getStudentsAndDocuments,
} from '../utils/firebase/firebase.utils'

export const StudentsContext = createContext({
  studentsMap: {},
  setStudentsMap: () => null,
  addFeedback: () => null,
})

export const StudentsProvider = ({ children }) => {
  const studentsMapInitial = new Map()
  const [studentsMap, setStudentsMap] = useState(studentsMapInitial)

  useEffect(() => {
    const getStudentsMap = async () => {
      const studentsMap = await getStudentsAndDocuments()
      setStudentsMap(studentsMap)
    }
    getStudentsMap()
  }, [])

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
    const feedbackId = studentComments.length + 1
    const feedbackList = [
      { description, behaviour, academics, date, feedbackId },
      ...studentComments,
    ]
    const [averageBehaviour, averageAcademics] = calculateScores(
      student,
      studentComments,
      behaviour,
      academics
    )

    const newStudent = {
      ...student,
      feedbackList,
      averageBehaviour,
      averageAcademics,
    }
    addFeedbackToStudent(student, {
      feedbackList,
      averageBehaviour,
      averageAcademics,
    })
    const newStudents = new Map(studentsMap)
    newStudents.set(studentId, newStudent)
    setStudentsMap(newStudents)
  }

  const value = { studentsMap, addFeedback }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
