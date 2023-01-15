import { Outlet, Link, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// import styles from './Header.module.css'
import styles from './Header.css'
import Container from "@mui/material/Container";
import IButton from "@mui/material/Button";

import { selectAuth } from '../../store/profile/selectors';
import { logOut } from '../../service/firebase';


export const navigate = [
  {
    id: 1,
    name: 'Main',
    to: '/'
  },
  {
    id: 2,
    name: 'Profile',
    to: '/profile'
  },
  {
    id: 3,
    name: 'Chat',
    to: '/chats'
  }, {
    id: 4,
    name: 'About',
    to: '/About'
  }, {
    id: 5,
    name: 'Rick and Morty',
    to: '/rickandmorty'
  }
  // , {
  //   id: 6,
  //   name: 'Sign In',
  //   to: '/signIn'
  // }, {
  //   id: 7,
  //   name: 'Sign Up',
  //   to: '/signUp'
  // },
]

export function Header() {
  const navigates=useNavigate()
  const name = useSelector((store) => store.name)
const isAuth=useSelector(selectAuth)

  const handleLogin=()=>{
    navigates('/signIn')
  }
    const handleSignUp=()=>{
    navigates('/signUp')

    }
  const handleLogOut=()=>{
    logOut()
  }


  return (
    <Container  className='container-style'>
      <nav className={styles.header}>
        <ul className='header'>
          {navigate.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  color: isActive ? '#d72472' : '#eaaa09'
                })}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
          {!isAuth && (
            <>
              <IButton onClick={handleLogin} variant="contained" color="secondary">Login</IButton>
              <IButton onClick={handleSignUp} variant="contained" color="secondary">Sign Up</IButton>
            </>

            )}
            {isAuth && (
            <>
              <IButton onClick={handleLogOut} variant="contained" color="secondary">log Out</IButton>

            </>

            )}
        <p>{name}</p>
      </nav>
      <main>
        <Outlet />
      </main>
    </ Container>
  )
}