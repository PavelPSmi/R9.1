import PropTypes from 'prop-types'
import { useState } from 'react'
import { AUTHOR } from '../../constants'
import {Button} from '../ui/Button'
import { useDispatch } from 'react-redux'
import { addMessage,addMessageWithReply } from '../../store/messages/actions'
import { useParams } from 'react-router-dom'

import IButton from "@mui/material/Button";
import ITextField from "@mui/material/TextField";
import './FormStyle.css'

import {set,push,remove} from 'firebase/database'
import { getMessageListById } from "../../service/firebase"

export function Form() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { chatId } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addMessageWithReply(chatId, {
      author: AUTHOR.user,
      text
    }))
    push(getMessageListById(chatId), {
      author: AUTHOR.user,
      text
    })
    setText('')
  }
  
  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit} className="form-style">
        <ITextField
          id="outlined-search"
          label="Search field"
          color="secondary"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
          <IButton type="Submit" variant="contained" color="secondary">Add message</IButton>
      </form>
      
    </>
  )
}

Form.propTypes = {
  addMessage: PropTypes.func
}