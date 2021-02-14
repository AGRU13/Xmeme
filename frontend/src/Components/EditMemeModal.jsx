import React,{useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});  

const EditMemeModal=({open,handleClose,id,getData})=>{
    const captionRef=useRef('');
    const urlRef=useRef('');

    const patchMeme=()=>{
        if(!captionRef.current.value&&!urlRef.current.value) {
            handleClose();
            return ;
        }

        axios.patch(`https://xmeme-agru.herokuapp.com/memes/${id}`,{
            caption: captionRef.current.value,
            url: urlRef.current.value 
        })
            .then(setTimeout(() => {
                getData()
                handleClose();
            }, 1000))
            .catch((err)=>{alert("something went wrong")});
    }

    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">EDIT A MEME</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the value of caption/url or both to change them
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="normal"
                    id="caption"
                    label="Caption"
                    type="text"
                    fullWidth
                    placeholder="minimum 3 maximum 255 characters"
                    inputRef={captionRef}
                    minLength='3'
                    maxLength='255'
                />
                <TextField
                    autoFocus
                    margin="normal"
                    id="url"
                    label="Meme Url"
                    type="url"  
                    fullWidth
                    placeholder="Enter an image url starting with http"
                    inputRef={urlRef}
                    minLength='10'
                    maxLength='2048'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={patchMeme} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default EditMemeModal;