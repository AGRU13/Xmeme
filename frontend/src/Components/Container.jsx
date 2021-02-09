import React, { useEffect, useState } from 'react';
import axios from 'axios';

const container=()=>{

    const [memes,setMemes]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8081/memes")
            .then((response)=>response.data)
            .then((memeData)=>setMemes(memeData))
            .catch((error)=>console.log(error));     
    },[]);

    return(
        <div className="wrapper"></div>
    );
}

export default container;