import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Altimage from './../assests/error.jpg';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 20,
        backgroundColor: indigo[50]
    },
    media: {
        height:'30vh',
    },
    image:{
        height:'auto',
        width:'100%',
        maxHeight: '100%',
        maxWidth:'100%',
    }
});

export default function ItemCard({id,name,caption,url,deleteMeme,handleClickOpen}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                >
                    <img src={url} onError={(e)=>{e.target.onerror = null; e.target.src=`${Altimage}`}} className={classes.image}></img>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {caption}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" margin="dense" onClick={()=>handleClickOpen(id)}>
                    Edit
                </Button>
                <Button size="small" color="primary" margin="dense"  onClick={()=>deleteMeme(id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}