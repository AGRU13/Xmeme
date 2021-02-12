import React, { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from './ItemCard';
import EditMemeModal from './EditMemeModal';

const Container=({getData,memesData,deleteMeme,skip,setSkip,hasMore})=>{

    useEffect(()=>{
        getData();
    },[]);
    
    const [open,setOpen]=useState(false);
    const [id,setId]=useState(null);

    const handleClickOpen = (_id) => {
        setId(_id);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
            <React.Fragment>
            <EditMemeModal open={open} handleClose={handleClose} id={id} getData={getData}/>
            <InfiniteScroll
          dataLength={memesData.length}
          next={()=>{getData(skip+100)}}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
            <Grid container spacing={30} style={{padding: '24px'}}>
                {memesData.map( card =>
                    <Grid key={card.id} item xs={12} sm={6} md={3} lg={3}>
                        <ItemCard key={card.id} 
                            id={card.id}
                            name={card.name}
                            url={card.url} 
                            caption={card.caption}
                            deleteMeme={deleteMeme}
                            handleClickOpen={handleClickOpen}
                            />
                    </Grid> 
                )}
            </Grid>
            </InfiniteScroll>
            </React.Fragment>
    );
}

export default Container;