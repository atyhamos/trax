import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
} from 'firebase/firestore'

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
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    // Create document
    const { email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, { email, createdAt })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }
  return userDocRef
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

export const addFeedbackToStudent = async (student, newData) => {
  const studentRef = doc(db, 'students', student.name)
  await updateDoc(studentRef, newData)
}

export const getStudentsAndDocuments = async () => {
  const studentsRef = collection(db, 'students')
  const q = query(studentsRef)
  const querySnapshot = await getDocs(q)
  const studentMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { id } = docSnapshot.data()
    acc.set(id, docSnapshot.data())
    return acc
  }, new Map())
  return studentMap
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

export const signOutAuthUser = () =>
  signOut(auth)
    .then(() => {
      // Signed out successfully
      return
    })
    .catch((error) => {
      console.log(error)
    })

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}
