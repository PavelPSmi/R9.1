import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuth } from '../store/profile/actions'
import { signUp } from "../service/firebase";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export function SignUp() {
    const [inputs, setInputs] = useState({ email: '', password: '' })
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const dispach=useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        setLoading(true)
        try {
            await signUp(inputs.email, inputs.password)
            navigate('/signIn')
        } catch (err) {
            setErr(err.message)
            console.log('false')
            setInputs({email: '', password: ''})
        }finally{
            setLoading(false)
        }
        // if (inputs.email === 'Pavel' && inputs.password === 'Smi') {
        //     dispach(isAuth(true))
        //     navigate('/chats')
        //     console.log('OK')
        // } else {
        //     setErr('Login and Password no true')
        //     console.log('false')
        //     setInputs({email: '', password: ''})
        // }
    }

    return (
        <>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input type='email' name="email" value={inputs.email}
                    onChange={(e) => setInputs((prev)=>({ ...prev, [e.target.name]: e.target.value }))} />
                <p>Password:</p>
                <input type='text' name="password" value={inputs.password}
                    onChange={(e) => setInputs((prev)=>({ ...prev, [e.target.name]: e.target.value }))} />
                <button>Sign Up</button>
            </form>
            {loading && <Box sx={{ display: 'flex', justifyContent:'center' }}><CircularProgress />
            </Box>}
            {err && <p>{err}</p>}
        </>
    )
}