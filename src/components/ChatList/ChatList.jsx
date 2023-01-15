import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, deleteChat } from '../../store/messages/actions'
import { selectChat } from '../../store/messages/selectors'
import ITextField from "@mui/material/TextField";
import IButton from "@mui/material/Button";
import styles from './ChatList.module.css'

import {set,push,remove} from 'firebase/database'
import { messagesRef } from "../../service/firebase"

export function ChatList({messagesDB}) {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const chats = useSelector(selectChat,
    (prev, next) => prev.length === next.length)


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addChat(value))

    set(messagesRef,{
      ...messagesDB,
      [value]:{
        name:value
      }
    })
    setValue('');
  }



  return (
    <>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.name}`}>
              {chat.name}
            </Link>
                  <IButton onClick={() => dispatch(deleteChat(chat.name))} className='button-chatName'>delete Chat</IButton>

            {/* <button onClick={() => dispatch(deleteChat(chat.name))} className='button-chatName'>delete Chat</button> */}
          </li>
        ))}
      </ul>

      <h1>ChatList</h1>
      <form onSubmit={handleSubmit} className="form-style">
        <ITextField
          color="secondary"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <IButton type="submit" color="secondary">
          Create a CHAT
        </IButton>      
        </form>
    </>
  )
}