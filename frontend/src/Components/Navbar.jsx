import React,{useState} from 'react';
import Logo from './../assests/close.svg';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { indigo, grey ,amber} from '@material-ui/core/colors';
import AddMemeModal from './AddMemeModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar:{
        backgroundColor:indigo[100],
        color: grey[900],
    },
    toolbar:{
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'center',
          },
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
    swagButton:{
        backgroundColor: amber[300],
        margin: theme.spacing(1),
    },
}));
  
const Navbar=({getData})=>{
    const [open,setOpen]=useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const openSwagger=()=>{
        window.open("https://xmeme-agru.herokuapp.com/api-docs/","_blank");
    }

    const classes = useStyles();
    return(
        <div className={classes.root} >
            <AddMemeModal 
                open={open}
                handleClose={handleClose}
                getData={getData}
            />
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Icon classes={classes.iconRoot}>
                        <img className={classes.imageIcon} src={Logo}/>
                    </Icon>
                    <Typography variant="h5" className={classes.title}>
                        meme
                    </Typography>
                    <Button
                        variant="contained"
                        className={classes.swagButton}
                        endIcon={<Icon>send</Icon>}
                        onClick={openSwagger}
                    >
                        Swagger
                    </Button>
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