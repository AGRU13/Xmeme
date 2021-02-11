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

//https://i.ibb.co/WVQ4JJt/be-afraid-be-very-afraid.jpg

const AddMemeModal=({open,handleClose})=>{

    const nameRef=useRef('');
    const captionRef=useRef('');
    const urlRef=useRef('');

    const sendMeme=()=>{
        axios.post("http://localhost:8081/memes",{
            name: nameRef.current.value,
            caption: captionRef.current.value,
            url: urlRef.current.value 
        })
            .then( handleClose())
            .catch(()=>{alert("something went wrong")});
    }

    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">POST A MEME</DialogTitle>
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
                    minlength='3'
                    maxlength='255'
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
                    minlength='3'
                    maxlength='255'
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={sendMeme} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddMemeModal;