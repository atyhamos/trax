import { createContext, useContext, useEffect, useState } from 'react'
import {
  addFeedbackToStudent,
  addStudentDocument,
  getStudents,
  removeStudentDocument,
  updatePersonData,
} from '../utils/firebase/firebase.utils'
import { TeachersContext } from './TeachersContext'
import Hashids from 'hashids'

export const StudentsContext = createContext({
  studentsMap: null,
  setStudentsMap: () => null,
  addFeedback: () => null,
  deleteFeedbackFromStudent: () => null,
  addStudent: () => null,
  removeStudent: () => null,
  studentSize: -1,
})

export const StudentsProvider = ({ children }) => {
  const studentsMapInitial = new Map()
  const [studentsMap, setStudentsMap] = useState(studentsMapInitial)
  const { currentTeacher } = useContext(TeachersContext)
  const [studentSize, setStudentSize] = useState(-1) // size of -1 means map has not been initialized
  useEffect(() => {
    const getStudentsMap = async () => {
      if (Object.keys(currentTeacher).length) {
        const studentsMap = await getStudents(currentTeacher.group) // get students from teacher's group
        setStudentsMap(studentsMap)
        setStudentSize(studentsMap.size)
      }
    }
    getStudentsMap()
    console.log('Running useEffect: studentsMap')
  }, [currentTeacher])

  const calculateScores = (studentComments) => {
    if (!studentComments.length) return [0, 0]
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
    const hashids = new Hashids()
    const id = hashids.encode(Date.now())
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
    updatePersonData('students', student, newData)
    const newStudentsMap = new Map(studentsMap)
    newStudentsMap.set(student.id, newData)
    console.log(newData)
    setStudentsMap(newStudentsMap)
    setStudentSize(newStudentsMap.size)
  }

  const resetStudentsContext = () => {
    setStudentsMap(studentsMapInitial)
    setStudentSize(-1)
  }

  const addStudent = async (student, group) => {
    try {
      const newStudent = await addStudentDocument(student, group)
      const newStudentsMap = new Map(studentsMap.set(newStudent.id, newStudent))
      console.log(newStudentsMap)
      setStudentsMap(newStudentsMap)
    } catch (error) {
      alert(error.message)
    }
  }

  const removeStudent = async (studentId) => {
    await removeStudentDocument(studentId)
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
    studentSize,
  }
  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  )
}
