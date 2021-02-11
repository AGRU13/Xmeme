import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard'
import axios from 'axios';

const Container=()=>{

    const [memesData,setMemes]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8081/memes")
            .then((response)=>response.data)
            .then((memeData)=>{ setMemes(memeData); console.log(memeData)})
            .catch((error)=>console.log(error));     
    },[]);
    
    return (
            <Grid container spacing={30}style={{padding: '24px'}}>
                {memesData.map( card =>
                    <Grid key={card.id} item xs={12} sm={6} md={3} lg={3}>
                        <ItemCard key={card.id} 
                            name={card.name}
                            url={card.url} 
                            caption={card.caption}/>
                    </Grid> 
                )}
            </Grid>
    );
}

export default Container;