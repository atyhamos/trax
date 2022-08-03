import { createContext, useContext, useEffect, useState } from 'react'
import {
  addFeedbackToStudent,
  addStudentDocument,
  getStudents,
  removeStudentDocument,
  updatePersonData,
} from '../utils/firebase/firebase.utils'
import { TeachersContext } from './TeachersContext'

export const StudentsContext = createContext({
  studentsMap: {},
  setStudentsMap: () => null,
  addFeedback: () => null,
  deleteFeedbackFromStudent: () => null,
  addStudent: () => null,
  removeStudent: () => null,
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

  const calculateScores = (studentComments) => {
    let totalBehaviourScore = 0
    let totalAcademicScore = 0
    studentComments.forEach((feedback) => {
      totalBehaviourScore += feedback.behaviour
      totalAcademicScore += feedback.academics
    })
    const averageBehaviour = totalBehaviourScore / studentComments.length
    const averageAcademics = totalAcademicScore / studentComments.length
    return [averageBehaviour, averageAcademics]
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
    const [averageBehaviour, averageAcademics] = calculateScores(feedbackList)

    const newData = {
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
    const newStudentsMap = new Map(studentsMap)
    newStudentsMap.set(studentId, newData)
    setStudentsMap(newStudentsMap)
  }

  const deleteFeedbackFromStudent = async (student, feedbackToDelete) => {
    console.log('deleting feedback from student')
    console.log(feedbackToDelete)
    const feedbackList = student.feedbackList.filter(
      (feedback) => feedback.id !== feedbackToDelete.id
    )
    const [averageBehaviour, averageAcademics] = calculateScores(feedbackList)
    const newData = {
      ...student,
      feedbackList,
      averageBehaviour,
      averageAcademics,
    }
    await updatePersonData('students', student, newData)
    const newStudentsMap = new Map(studentsMap)
    newStudentsMap.set(student.id, newData)
    console.log(newData)
    setStudentsMap(newStudentsMap)
  }

  const resetStudentsContext = () => {
    setStudentsMap(studentsMapInitial)
  }

  const addStudent = (student, group) => {
    addStudentDocument(student, group).then((newStudent) => {
      const newStudentsMap = new Map(studentsMap.set(newStudent.id, newStudent))
      console.log(newStudentsMap)
      setStudentsMap(newStudentsMap)
    })
  }
  const removeStudent = async (studentId) => {
    const studentToDelete = studentsMap.get(studentId).name
    await removeStudentDocument(studentToDelete)
    studentsMap.delete(studentId)
    setStudentsMap(new Map(studentsMap))
    console.log(studentsMap)
  }

  const value = {
    studentsMap,
    addFeedback,
    deleteFeedbackFromStudent,
    resetStudentsContext,
    addStudent,
    removeStudent,
  }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
