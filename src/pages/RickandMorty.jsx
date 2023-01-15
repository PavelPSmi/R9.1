import React, { useEffect, useState } from "react"
import { API } from '../constants'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import IButton from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './RickandMorty.css'


// const resFromAPI = fetch(API)
//             .then((res) => res.json())
//             .then(json =>  console.log(json.results))
// .then((data) => console.log(data))
// console.log(setArtWork)



export function RickandMorty() {
    const [RickandMorty, setRickandMorty] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('')
    // console.log(ArtWork)

    const getFetchAPI = async () => {
        setLoading(true)
        try {
            const res = await fetch(API)
            if (res.ok) {
                const data = await res.json()
                setRickandMorty(data.results)
            }
        } catch (err) {
            setErr(err.message)
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        // const resFromAPI = fetch(API)
        //     .then((res) => res.json())
        //     .then(json => setRickandMorty(json.results))
        getFetchAPI()

    }, [])

    return (
        <>
            <div className="text-cards">Rick and Morty</div>
            <IButton type="submit" color="secondary" 
            sx={{ display: 'flex', justifyContent:'center', margin:'0 auto', marginBottom:'10px'}}
            onClick={getFetchAPI}>Get API</IButton>
                {loading && <Box sx={{ display: 'flex', justifyContent:'center' }}><CircularProgress />
            </Box>}
            <div className="card-box">
                {!loading && RickandMorty.map((item) => (
                    <Card sx={{ maxWidth: 250 }} key={item.id} className="card-item">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                width='100%'
                                height='250px'
                                object-fit="cover"
                                image={item.image}
                                alt="Hero Rick and Morty"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Gender/{item.gender}.<br />
                                    From world {item.origin.name}.<br />Status {item.status}.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>))}
                    {err && <p style={{color:'red'}}>{err}</p>}
            </div>
        </>
    )
}