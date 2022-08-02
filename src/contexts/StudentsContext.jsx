import { createContext, useContext, useEffect, useState } from 'react'
import {
  addFeedbackToStudent,
  getStudents,
  updatePersonData,
} from '../utils/firebase/firebase.utils'
import { TeachersContext } from './TeachersContext'

export const StudentsContext = createContext({
  studentsMap: {},
  setStudentsMap: () => null,
  addFeedback: () => null,
  deleteFeedbackFromStudent: () => null,
})

export const StudentsProvider = ({ children }) => {
  const studentsMapInitial = new Map()
  const [studentsMap, setStudentsMap] = useState(studentsMapInitial)
  const { currentTeacher } = useContext(TeachersContext)

  useEffect(() => {
    const getStudentsMap = async () => {
      if (currentTeacher) {
        const studentsMap = await getStudents(currentTeacher.group) // get students from teacher's group
        setStudentsMap(studentsMap)
      }
    }
    getStudentsMap()
    console.log('Running useEffect: studentsMap')
  }, [currentTeacher])

  const calculateScores = (
    student,
    studentComments,
    newBehaviour,
    newAcademics
  ) => {
    if (student.averageAcademics && student.averageBehaviour) {
      // existing score, multiply for faster operation
      const totalBehaviourScore =
        student.averageBehaviour * studentComments.length + newBehaviour
      const totalAcademicScore =
        student.averageAcademics * studentComments.length + newAcademics
      const newAverageBehaviour =
        totalBehaviourScore / (studentComments.length + 1)
      const newAverageAcademics =
        totalAcademicScore / (studentComments.length + 1)
      return [newAverageBehaviour, newAverageAcademics]
    } else {
      // calculate from scratch
      let totalBehaviourScore = newBehaviour
      let totalAcademicScore = newAcademics
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

  const addFeedback = (
    studentId,
    description,
    behaviour,
    academics,
    date,
    teacher
  ) => {
    const student = studentsMap.get(studentId)
    const studentComments = student.feedbackList
    const id = studentComments.length + 1
    const feedbackList = [
      { description, behaviour, academics, date, id, teacher },
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

  const deleteFeedbackFromStudent = async (student, feedbackToDelete) => {
    console.log('deleting feedback from student')
    console.log(feedbackToDelete)
    const newFeedback = student.feedbackList.filter(
      (feedback) => feedback.id !== feedbackToDelete.id
    )
    const newData = { ...student, feedbackList: newFeedback }
    await updatePersonData('students', student, newData)
    const newStudents = new Map(studentsMap)
    newStudents.set(student.id, newData)
    console.log(newData)
    setStudentsMap(newStudents)
  }

  const resetStudentsContext = () => {
    setStudentsMap(studentsMapInitial)
  }

  const value = {
    studentsMap,
    addFeedback,
    deleteFeedbackFromStudent,
    resetStudentsContext,
  }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
