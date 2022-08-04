import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  writeBatch,
  query,
  deleteDoc,
  deleteField,
} from 'firebase/firestore'
import Hashids from 'hashids'

const firebaseConfig = {
  apiKey: 'AIzaSyApwGVR9PLDDKLOZezOQBn97Es84CLI6CE',
  authDomain: 'tya-records.firebaseapp.com',
  projectId: 'tya-records',
  storageBucket: 'tya-records.appspot.com',
  messagingSenderId: '386364865134',
  appId: '1:386364865134:web:9ce69d7ffb072b5654847f',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export const db = getFirestore()

// Sign in using a popup.
const provider = new GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')
provider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, provider)
  // The signed-in user info.
  const user = result.user
  return user
}

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'teachers', userAuth.email)
  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    // Create document
    const { email } = userAuth
    const collectionRef = collection(db, 'teachers')
    const hashids = new Hashids()
    const id = hashids.encode(Date.now())
    const isAdmin = false
    const name = email.split('@')[0]
    const group = ''
    try {
      const docRef = doc(collectionRef, email)
      await setDoc(docRef, { email, id, isAdmin, name, group })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const addCollectionAndDocuments = async (
  collectionKey,
  personsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  personsToAdd.forEach((person) => {
    const docRef = doc(collectionRef, person.name)
    batch.set(docRef, person)
  })
  await batch.commit()
}

export const addStudentDocument = async (student, group) => {
  const studentDocRef = doc(db, 'students', student.name)
  const studentSnapshot = await getDoc(studentDocRef)
  if (studentSnapshot.exists()) {
    throw Error('Student already exists.')
  }
  const collectionRef = collection(db, 'students')
  const hashids = new Hashids()
  const id = hashids.encode(Date.now())
  try {
    const docRef = doc(collectionRef, student.name)
    const studentData = {
      ...student,
      group,
      id,
      averageBehaviour: 0,
      averageAcademics: 0,
      feedbackList: [],
    }
    console.log(studentData)
    await setDoc(docRef, studentData)
    return studentData
  } catch (error) {
    console.log('Error creating user', error.message)
  }
}

export const removeStudentDocument = async (studentName) => {
  try {
    console.log(studentName)
    await deleteDoc(doc(db, 'students', studentName))
  } catch (error) {
    console.log(error)
  }
}

export const addFeedbackToStudent = async (student, newData) => {
  const studentRef = doc(db, 'students', student.name)
  await updateDoc(studentRef, newData)
}

export const getTeachers = async () => {
  const collectionRef = collection(db, 'teachers')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  const teachersMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { email } = docSnapshot.data()
    acc.set(email, docSnapshot.data())
    return acc
  }, new Map())
  return teachersMap
}

export const getGroups = async () => {
  const collectionRef = collection(db, 'groups')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs
}

export const getRequests = async (group) => {
  const docRef = doc(db, 'groups', group)
  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    console.log('Document data:', docSnapshot.data())
    return docSnapshot.data().requests
  } else {
    console.log('No such document!')
  }
}

export const removeRequestFromGroup = async (email, group) => {
  const groupRef = doc(db, 'groups', group)
  const docSnapshot = await getDoc(groupRef)
  if (docSnapshot.exists()) {
    const newRequests = docSnapshot
      .data()
      .requests.filter((request) => request.email !== email)
    const newData = { ...docSnapshot.data(), requests: newRequests }
    await updateGroupData(group, newData)
    return newRequests
  } else {
    console.log('No such document!')
  }
}

export const addSentRequestToUser = async (teacher, group) => {
  const sentRequests = teacher.sentRequests || []
  await updatePersonData('teachers', teacher, {
    ...teacher,
    sentRequests: [...sentRequests, group],
  })
}

export const clearSentRequests = async (teacher) => {
  await updatePersonData('teachers', teacher, { ...teacher, sentRequests: [] })
}

// export const deleteGroup = async (teacher, group) => {
//   // get all requests to the group
//   const groupDocRef = doc(db, 'groups', group)
//   const groupSnapshot = await getDoc(groupDocRef)
//   const requests = groupSnapshot.data().requests

//   // remove the deleted group from each person's request list
//   requests.forEach(async (request) =>  {
//     const docRef = doc(db, 'teachers', request.email)
//     const docSnapshot = await getDoc(docRef)
//     const teacher = docSnapshot.data()
//     const {sentRequests} = teacher
//     const newSentRequests = sentRequests.filter(sentRequest => sentRequest !== request)
//     await updateDoc(doc(db, 'teachers', request.email), {...teacher, newSentRequests})
//   })

//   // delete the group document
//   await deleteDoc(doc(db, 'groups', group))
// }

export const createGroup = async (teacher, group) => {
  const groupDocRef = doc(db, 'groups', group)
  const groupSnapshot = await getDoc(groupDocRef)
  if (groupSnapshot.exists()) {
    throw Error('Group already exists.')
  }
  const collectionRef = collection(db, 'groups')
  try {
    const docRef = doc(collectionRef, group)

    // instantiate group document
    await setDoc(docRef, { requests: [] })

    // remove sentRequests field in user
    await updatePersonData('teachers', teacher, {
      ...teacher,
      group,
      isAdmin: true,
      sentRequests: deleteField(),
    })

    // Removing requests from all the groups they previously sent to
    teacher.sentRequests.forEach((requestedGroup) => {
      removeRequestFromGroup(teacher.email, requestedGroup)
    })
    return docRef
  } catch (err) {
    console.log(`Error creating group`, err)
    throw new Error(`Error creating group`, err.message)
  }
}

export const addRequestToGroup = async (teacher, group) => {
  const groupRef = doc(db, 'groups', group)
  const docSnapshot = await getDoc(groupRef)
  const existingRequest = docSnapshot
    .data()
    .requests.find((request) => request.email === teacher.email)
  if (existingRequest) {
    // Cancel send
    throw new Error(`You have already sent a request to ${group}`)
  }
  const newRequests = [
    { email: teacher.email, id: teacher.id },
    ...docSnapshot.data().requests,
  ]
  const newData = { ...docSnapshot.data(), requests: newRequests }
  await updateGroupData(group, newData)
  await addSentRequestToUser(teacher, group)
  return newRequests
}

export const getStudents = async (teacherGroup) => {
  const collectionRef = collection(db, 'students')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  const studentsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { id, group } = docSnapshot.data()
    if (group !== teacherGroup) return acc
    acc.set(id, docSnapshot.data())
    return acc
  }, new Map())
  return studentsMap
}

export const signInWithAuthEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('No user associated with this email')
          break
        default:
          console.log(error)
      }
    })

export const signOutAuthUser = async () => {
  try {
    await signOut(auth)
    return
  } catch (error) {
    console.log(`Error while signing out: ${error}`)
  }
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}

export const updateDisplayName = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: '',
  })
    .then(() => console.log('Display name updated!'))
    .catch((error) => console.log(error))
}

export const updatePersonData = async (collectionKey, person, newData) => {
  switch (collectionKey) {
    case 'teachers':
      const teacherRef = doc(db, collectionKey, person.email)
      try {
        await updateDoc(teacherRef, newData)
        console.log(`Successfully updated profile`)
      } catch (error) {
        console.log(error)
      }
      break
    case 'students':
      const studentRef = doc(db, collectionKey, person.name)
      try {
        await updateDoc(studentRef, newData)
        console.log(`Successfully updated profile`)
      } catch (error) {
        console.log(error)
      }
      break
    default:
      break
  }
}

export const updateGroupData = async (group, newData) => {
  const groupRef = doc(db, 'groups', group)
  try {
    await updateDoc(groupRef, newData)
    console.log(`Successfully updated group data`)
  } catch (error) {
    console.log(error)
  }
}
