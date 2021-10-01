import React, { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core'
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from './ItemCard';
import EditMemeModal from './EditMemeModal';
import { indigo } from '@material-ui/core/colors';
import Loader from './Loader';

const useStyles = makeStyles({
    loader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: "100px"
    }
})

const Container = ({ getData, memesData, deleteMeme, skip, hasMore }) => {
    
    const classes = useStyles();

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

    if (!memesData?.length) return <Loader containerStyle={classes.loader} />

    return (
            <React.Fragment>
            <EditMemeModal open={open} handleClose={handleClose} id={id} getData={getData}/>
            <InfiniteScroll
                dataLength={memesData.length}
                next={()=>{getData(skip+100)}}
                hasMore={hasMore}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
            <Grid container spacing={30} style={{padding: '24px', backgroundColor: indigo[50]}}>
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