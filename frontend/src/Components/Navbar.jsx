import React,{useState} from 'react';
import Logo from './../assests/close.svg';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { grey } from '@material-ui/core/colors';
import AddMemeModal from './AddMemeModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar:{
        backgroundColor: grey[50],
        color: grey[900],
    },
    title: {
        flexGrow: 1,
    },
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit'
    },
    iconRoot: {
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
    },
}));
  
const Navbar=()=>{
    const [open,setOpen]=useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    // const addMeme=()=>{        
    // }
    const classes = useStyles();
    return(
        <div className={classes.root} >
            <AddMemeModal 
                open={open}
                handleClose={handleClose}
            />
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Icon classes={classes.iconRoot}>
                        <img className={classes.imageIcon} src={Logo}/>
                    </Icon>
                    <Typography variant="h5" className={classes.title}>
                        meme
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        onClick={handleClickOpen}
                    >
                        Add meme
                    </Button>
                </Toolbar>
            </AppBar>
      </div>
    );
} 

export default Navbar;