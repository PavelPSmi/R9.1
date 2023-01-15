import { Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { isAuth } from "./store/profile/actions";

import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage'
import { ChatList } from './components/ChatList/ChatList';
import { AboutWithConnect } from "./pages/AboutPage";
import { RickandMorty } from "./pages/RickandMorty";
import{SignIn} from './pages/SignIn'
import { SignUp } from "./pages/SignUp";
import{PrivateRoute} from './utils/PrivateRoute'
import{PublicRoute} from './utils/PublicRoute'
import { firebaseAuth,messagesRef } from './service/firebase'
import { onValue } from "firebase/database";

import { useEffect, useState } from 'react'
import { defaultContext, ThemeContext } from './utils/ThemeContext'
import { useDispatch } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from "redux-persist/integration/react";

const defaultMessges = {
  default: [
    {
      author: 'ALISA',
      text: 'HI'
    },
    
  ]
}

export function App () {
  const [messages, setMessages] = useState(defaultMessges)
  const [theme, setTheme] = useState(defaultContext.theme)

  const [messagesDB,setMessagesDB]=useState({})
    const [chats, setChats] = useState([]);

  const dispatch=useDispatch()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(()=>{

    const unsubsrcribe=firebaseAuth.onAuthStateChanged((user)=>{
    if(user){
      dispatch(isAuth(true))
    }else{
      dispatch(isAuth(false))
    }
  })
  return unsubsrcribe
  })



  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      // const newChats = Object.entries(data).map((item) => ({
      //   name: item[0],
      //   messages: item[1].messageList,
      // }));

      setMessagesDB(data);
      // setChats(newChats);
    });
  }, []);


  return (
    <>
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider
          value={{
            theme,
            toggleTheme,
          }}
        >
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="about" element={<AboutWithConnect />} />
              <Route path="rickandmorty" element={<RickandMorty />} />

              <Route
                path="/signIn"
                element={<PublicRoute component={<SignIn />} />}
              />
              <Route path="/signUp" element={<SignUp />} />

              <Route path="chats" element={<PrivateRoute />}>
                <Route
                  index
                  element={<ChatList chats={chats} messagesDB={messagesDB} />}
                />
                <Route
                  path=":chatId"
                  element={<ChatsPage chats={chats} messagesDB={messagesDB} />}
                />
              </Route>
            </Route>

            <Route path="*" element={<h2>404 Page not FOUND</h2>} />
          </Routes>
        </ThemeContext.Provider>
      </PersistGate>
    </>
  );
}