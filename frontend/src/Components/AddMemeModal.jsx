import React,{useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});  

const AddMemeModal=({open,handleClose,getData})=>{

    const nameRef=useRef('');
    const captionRef=useRef('');
    const urlRef=useRef('');

    const sendMeme=()=>{
        axios.post("https://xmeme-agru.herokuapp.com/memes",{
            name: nameRef.current.value,
            caption: captionRef.current.value,
            url: urlRef.current.value 
        })
            .then(setTimeout(() => {
                getData()
                handleClose();
            }, 1000))
            .catch((err)=>{console.log(err);alert("something went wrong")});
    }

    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">POST A MEME</DialogTitle>
            <form onSubmit={sendMeme}>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    required
                    placeholder="minimum 3 maximum 255 characters"
                    inputRef={nameRef}
                    inputProps={{ maxLength:255, minLength:3}}
                />
                <TextField
                    autoFocus
                    margin="normal"
                    id="caption"
                    label="Caption"
                    type="text"
                    fullWidth
                    placeholder="minimum 3 maximum 255 characters"
                    required
                    inputRef={captionRef}
                    inputProps={{ maxLength:255, minLength:3}}
                />
                <TextField
                    autoFocus
                    margin="normal"
                    id="url"
                    label="Meme Url"
                    type="url"  
                    fullWidth
                    placeholder="Enter an image url starting with http"
                    required
                    inputRef={urlRef}
                    inputProps={{ maxLength:255, minLength:3}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddMemeModal;