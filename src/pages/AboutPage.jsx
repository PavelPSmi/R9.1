import { useContext, useState } from 'react'
import { ThemeContext } from '../utils/ThemeContext'
import { connect } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux'
// import * as types from '../store/profile/types'
import { changeName, toggleProfile } from '../store/profile/actions'
// import { selectName, selectVisible } from '../store/profile/selectors'

import IButton from "@mui/material/Button";
// import ITextField from "@mui/material/TextField";

function AboutPage(props) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  // const name = useSelector(selectName)
  // const visible = useSelector(selectVisible)
  const [value, setValue] = useState('')

  // const dispatch = useDispatch()

  const hendleChange = () => {
    console.log(value)
    // dispatch(changeName(value))
    setValue('')
  }

  return (
    <>
      <h1>About text</h1>
      <p>{theme === 'light' ? 'LIGHT' : 'DARK'}</p>
      <IButton type="submit" color="secondary" onClick={toggleTheme}>Change theme</IButton>
      <hr />
      <h2>{props.name}</h2>
      <input type="checkbox" checked={props.visible} readOnly />
      <IButton type="submit" color="secondary" onClick={() => props.toggle()} >change visible</IButton>
      <br />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IButton type="submit" color="secondary" onClick={() => props.changeName(value)}>Change name</IButton>
    </>
  )
}


const mapStateToProps = (state) => ({
  name: state.profile.name,
  visible: state.profile.visible
})

const mapDispatchToProps = (dispatch) => ({ toggle: ()=>dispatch(toggleProfile()),
changeName: (value)=>dispatch(changeName(value))})
export const AboutWithConnect = connect(mapStateToProps, mapDispatchToProps)(AboutPage)