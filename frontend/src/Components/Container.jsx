import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
        height: 1000,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const Container=()=>{

    const [memesData,setMemes]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8081/memes")
            .then((response)=>response.data)
            .then((memeData)=>{ setMemes(memeData); console.log(memeData)})
            .catch((error)=>console.log(error));     
    },[]);
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <GridList cellHeight={300}  spacing={30} className={classes.gridList}>
                <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                    <ListSubheader component="div"></ListSubheader>
                </GridListTile>
                {memesData.map((tile) => (
                    <GridListTile key={tile._id}>
                        <img src={tile.url} alt={tile.name} />
                        <GridListTileBar
                            title={tile.name}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
      </div>
    );
}

export default Container;