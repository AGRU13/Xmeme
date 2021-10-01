import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    loader: {
        border: "12px solid #c5cae9",
        borderRadius: "50%",
        borderTop: "12px solid #f44336",
        width: (props) => `${props.size}px`,
        height: (props) => `${props.size}px`,
        animation: "$spin 2s linear infinite"
    },
    "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" }
    }
});

const Loader = ({ size = 60, containerStyle }) => {
    const classes = useStyles({size});
    return (
        <section className={containerStyle}>
            <div className={classes.loader} />
        </section>
    )
}


export default Loader;
