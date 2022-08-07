import React, { useState } from 'react'
import {
  addRequestToGroup,
  createGroup,
  getGroups,
} from '../../utils/firebase/firebase.utils'
import { SmallLoading } from '../loading/Loading.component'
import './GroupForm.component.scss'

const GroupForm = ({ teacher }) => {
  const [requestGroupName, setRequestGroupName] = useState('')
  const [createGroupName, setCreateGroupName] = useState('')
  const [requestMessage, setRequestMessage] = useState('')
  const [createMessage, setCreateMessage] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleRequest = (e) => {
    // Search if that group name exists
    e.preventDefault()
    setIsRequesting(true)
    getGroups()
      .then((groups) => {
        return groups.filter((group) => group.id === requestGroupName)
      })
      .then((res) => {
        if (res.length) {
          addRequestToGroup(teacher, requestGroupName)
            .then(() => {
              setRequestMessage(
                `Group found! Request to join ${requestGroupName} sent.`
              )
              setIsRequesting(false)
            })
            .catch((err) => {
              console.log(err)
              setRequestMessage(err.message)
              setIsRequesting(false)
            })
        } else {
          setRequestMessage(`Group not found. Try again`)
          setIsRequesting(false)
        }
      })
  }

  const handleCreate = (e) => {
    e.preventDefault()
    setIsCreating(true)
    createGroup(teacher, createGroupName)
      .then(() => {
        setCreateMessage(`Group created! `)
        setIsCreating(false)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch((err) => {
        setCreateMessage(err.message)
        setIsCreating(false)
      })
  }

  const handleRequestChange = (event) => {
    setRequestGroupName(event.target.value)
  }
  const handleCreateChange = (event) => {
    setCreateGroupName(event.target.value)
  }

  return (
    <div className='dashboard-page-no-group body-container'>
      <h1>Dear {teacher.name},</h1>
      <p>
        You <span>do not</span> belong to a group yet.
      </p>
      <div className='group-forms-container'>
        <form className='form-container group-form' onSubmit={handleRequest}>
          <label>Request to join a group:</label>
          <input
            type='text'
            placeholder='Enter group name'
            name='name'
            value={requestGroupName}
            onChange={handleRequestChange}
            required
            className='text-input'
          />
          <button type='submit' className='btn'>
            Request
          </button>
          {isRequesting ? <SmallLoading /> : <p>{requestMessage}</p>}
        </form>
        <form className='form-container  group-form' onSubmit={handleCreate}>
          <label>or create your own group:</label>
          <input
            type='text'
            placeholder='Enter group name'
            name='name'
            value={createGroupName}
            onChange={handleCreateChange}
            required
            className='text-input'
          />
          <button type='submit' className='btn'>
            Create
          </button>
          {isCreating ? <SmallLoading /> : <p>{createMessage}</p>}
        </form>
      </div>
    </div>
  )
}

export default GroupForm
