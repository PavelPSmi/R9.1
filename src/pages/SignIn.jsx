import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuth } from '../store/profile/actions'
import { signIn } from "../service/firebase";
import { SignUp } from "./SignUp";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function SignIn() {
    const [inputs, setInputs] = useState({ login: '', password: '' })
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const dispach=useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErr('')
        setLoading(true)

        try {
            await signIn(inputs.email, inputs.password);
            dispach(isAuth(true))
            navigate('/chats')
        } catch (err) {
            setErr(err.message)
            console.log(err)
            setInputs({email: '', password: ''})
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div>Sign In</div>
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input type='email' name="email" value={inputs.email}
                    onChange={(e) => setInputs((prev)=>({ ...prev, [e.target.name]: e.target.value }))} />
                <p>Password:</p>
                <input type='text' name="password" value={inputs.password}
                    onChange={(e) => setInputs((prev)=>({ ...prev, [e.target.name]: e.target.value }))} />
                <button>Sign In</button>
            </form>
            {loading && <Box sx={{ display: 'flex', justifyContent:'center' }}><CircularProgress />
                </Box>}
            {err && <p>{err}</p>}        
            </>
    )
}