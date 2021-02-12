import './App.css';
import React,{ useState } from "react";
import axios from 'axios';
import Navbar from "./Components/Navbar";
import Container from "./Components/Container";

function App() {
    const [memesData,setMemes]=useState([]);
    const [hasMore,setHasMore]=useState(true);
    const [skip,setSkip]=useState(0);

    const getData=(_skip=0)=>{
        setSkip(_skip);
        console.log("skip:",`http://localhost:8081/memes?skip=${_skip}`);
        axios.get(`http://localhost:8081/memes?skip=${_skip}`)
        .then((response)=>response.data)
        .then((data)=>{ 
            if(data.length===0){
                setHasMore(false);
                return ;
            }
            
            setMemes(memesData.concat(data)); 
            console.log(memesData,data);
        })
        .catch((error)=>{alert("Something went wrong");console.log(error)});     
    }
    
    const deleteMeme=(id)=>{
        axios.delete(`http://localhost:8081/memes/${id}`)
            .then(()=>{
                const temp=[...memesData];
                temp.splice(temp.findIndex(a=>a.id==id),1);
                setMemes(temp);
            })
            .catch((error)=>{alert("Something went wrong");console.log(error)}); 
    }

    return (
        <React.Fragment>
            <Navbar 
                getData={getData}
            />
            <Container 
                getData={getData}
                memesData={memesData}
                deleteMeme={deleteMeme}
                skip={skip}
                setSkip={setSkip}
                hasMore={hasMore}
            />
        </React.Fragment>
    );
}

export default App;
