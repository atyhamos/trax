import React, { useState } from 'react'
import { getGroups } from '../../utils/firebase/firebase.utils'
import { SmallLoading } from '../loading/Loading.component'
import './GroupForm.component.scss'

const GroupForm = () => {
  const [groupName, setGroupName] = useState('')
  const [message, setMessage] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const handleSubmit = (e) => {
    // Search if that group name exists
    e.preventDefault()
    setIsSearching(true)
    console.log(`Searching for groups with name: ${groupName}`)
    getGroups()
      .then((groups) => {
        return groups.filter((group) => group.id === groupName)
      })
      .then((res) => {
        if (res.length) {
          console.log(`Group found! Request to join ${groupName} sent.`)
          setMessage(`Group found! Request to join ${groupName} sent.`)
        } else {
          setMessage(`Group not found. Try again`)
          console.log(`Group not found. Try again`)
        }
        setIsSearching(false)
      })
  }
  const handleChange = (event) => {
    setGroupName(event.target.value)
  }

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <p>You do not belong to a group.</p>
      <p>
        Enter the name of an existing group below to request access from their
        admins.
      </p>
      <input
        type='text'
        placeholder='Enter group name'
        name='name'
        value={groupName}
        onChange={handleChange}
        required
        className='text-input'
      />
      <button type='submit' className='btn'>
        Submit
      </button>
      <br />
      {isSearching ? <SmallLoading /> : <p>{message}</p>}
    </form>
  )
}

export default GroupForm
