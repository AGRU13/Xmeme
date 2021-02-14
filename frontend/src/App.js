import './App.css';
import React,{ useState } from "react";
import axios from 'axios';
import Navbar from "./Components/Navbar";
import Container from "./Components/Container";

function App() {

    //array to store all the memes data
    const [memesData,setMemes]=useState([]);

    //variable to know if more data is present in the data base
    const [hasMore,setHasMore]=useState(true);

    //variable to keep count of how many memes to skip for pagination
    const [skip,setSkip]=useState(0);

    const getData=(_skip=0)=>{
        //if no new pages are requested
        if(!_skip){
            axios.get(`https://xmeme-agru.herokuapp.com/memes/?skip=${skip}`)
            .then((response)=>response.data)
            .then((data)=>{ 
                setMemes(data); 
            })
            .catch((error)=>{alert("Something went wrong")});      
        }else{
<<<<<<< HEAD
=======
            //when new page is requested so skip is increased
>>>>>>> 77fbbda
            axios.get(`https://xmeme-agru.herokuapp.com/memes/?skip=${_skip}`)
            .then((response)=>response.data)
            .then((data)=>{ 
                if(data.length===0){
                    setHasMore(false);
                    return ;
                }

                setSkip(_skip);
                setMemes(memesData.concat(data)); 
            })
            .catch((error)=>{alert("Something went wrong")});    
        } 
    }
    
    const deleteMeme=(id)=>{
        axios.delete(`https://xmeme-agru.herokuapp.com/memes/${id}`)
            .then(()=>{
                let temp=[...memesData];
                temp.splice(temp.findIndex(a=>a.id==id),1);
                setMemes(temp);
            })
            .catch((error)=>{alert("Something went wrong")}); 
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
