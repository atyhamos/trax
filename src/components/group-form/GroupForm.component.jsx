import React, { useContext, useState } from 'react'
import { TeachersContext } from '../../contexts/TeachersContext'
import {
  addRequestToGroup,
  getGroups,
} from '../../utils/firebase/firebase.utils'
import { SmallLoading } from '../loading/Loading.component'
import './GroupForm.component.scss'

const GroupForm = ({ teacher }) => {
  const [groupName, setGroupName] = useState('')
  const [message, setMessage] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSubmit = (e) => {
    // Search if that group name exists
    e.preventDefault()
    setIsSearching(true)
    getGroups()
      .then((groups) => {
        return groups.filter((group) => group.id === groupName)
      })
      .then((res) => {
        if (res.length) {
          addRequestToGroup(teacher, groupName)
            .then(() => {
              setMessage(`Group found! Request to join ${groupName} sent.`)
              setIsSearching(false)
            })
            .catch((err) => {
              setMessage(err)
              setIsSearching(false)
            })
        } else {
          setMessage(`Group not found. Try again`)
          setIsSearching(false)
        }
      })
  }
  const handleChange = (event) => {
    setGroupName(event.target.value)
  }

  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <h2>Dear {teacher.name},</h2>
        <p>You do not belong to a group yet.</p>
        <p>
          Enter the name of an existing group below to request access from their
          admins to start using Trax.
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
    </>
  )
}

export default GroupForm
