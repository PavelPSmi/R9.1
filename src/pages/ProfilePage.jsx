import { useContext, useState } from 'react'
import { ThemeContext } from '../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import * as types from '../store/profile/types'
import { changeName, toggleProfile } from '../store/profile/actions'
import { selectName, selectVisible } from '../store/profile/selectors'

import IButton from "@mui/material/Button";
import ITextField from "@mui/material/TextField";

export function ProfilePage() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const name = useSelector(selectName)
  const visible = useSelector(selectVisible)
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const hendleChange = () => {
    console.log(value)
    dispatch(changeName(value))
    setValue('')
  }

  return (
    <>
      <h1>Profile Page</h1>
      <p>{theme === 'light' ? 'LIGHT' : 'DARK'}</p>
      <IButton type="submit" color="secondary" onClick={toggleTheme}>Change theme</IButton>
      <hr />
      <h2>{name}</h2>
      <input type="checkbox" checked={visible} readOnly />
      <IButton type="submit" color="secondary" onClick={() => dispatch(toggleProfile())} >change visible</IButton>
      <br />
      <input 
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IButton type="submit" color="secondary" onClick={() => dispatch(changeName(value))}>Change name</IButton>
    </>
  )
}