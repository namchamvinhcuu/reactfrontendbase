import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import MuiButtonAsync from './MuiButtonAsync'
import {
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,

    Paper,
    Button,
    Zoom,
    Fade,
    Grow,
    Slide,
    styled
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import Draggable from 'react-draggable'
import ShortUniqueId from "short-unique-id"

const Transition_Zoom = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const Transition_Fade = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

const Transition_Grow = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});
const Transition_Slide_Down = React.forwardRef(function Transition(props, ref) {
    return <Slide ref={ref} {...props} />;
});

const uid = new ShortUniqueId();

// const useStyles = styled(theme => ({
//     paper: {
//         overflowY: 'unset',
//     },

// }));

export const MuiDialog = ({ animate, isOpen, onClose, onSave, onReset, title, disable_animate, ...others }) => {

    // const classes = useStyles();
    const [id_dialog, _] = useState(uid());
    const [data, setData] = useState({});

    const PaperComponent = useCallback((props) => {
        return (
            <Draggable handle={"#draggable-dialog" + id_dialog} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }, []);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {

        return (() => {
            setData({})
        })
    }, [isOpen]);

    console.log('dis', disable_animate)

    return (
        <Dialog
            TransitionComponent={animate === "fade" ? Transition_Fade : animate === "grow" ? Transition_Grow : animate === "slide_down" ? Transition_Slide_Down : Transition_Zoom}
            transitionDuration={disable_animate || (data[id_dialog]?.disable_animate === true) ? disable_animate : 250}

            open={isOpen}
            PaperComponent={PaperComponent}
            // classes={{ paper: classes.paper }}
            sx={{ overflowY: 'unset' }}
            {...others}
        >
            <DialogTitle style={{ marginTop: '-6px', height: '55px', cursor: 'move' }} id={"draggable-dialog" + id_dialog}>
                {title}
                <IconButton sx={{
                    top: '-12px',
                    right: '-12px',
                    color: 'cornflowerblue',
                    borderRadius: '50%',
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: '35px',
                    height: '35px',
                    '&:hover': {
                        backgroundColor: 'aliceblue',
                    },
                    '&:disabled': {
                        backgroundColor: 'aliceblue',
                    },
                }} disabled={data[id_dialog]?.loading} onClick={handleClose} color="primary" >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>


            <DialogContent >
                {others.children}
            </DialogContent>

            <DialogActions>
                {onSave && <MuiButtonAsync

                    onCompleteStateChange={state => {

                        setData({ [id_dialog]: { loading: false } })
                    }}

                    onClick={(e) => {
                        setData({ [id_dialog]: { disable_animate: true, loading: true } })
                        return onSave(e);

                    }} icon="save" text="Save" />}

                {onReset && <MuiButtonAsync

                    onCompleteStateChange={state => {
                        setData({ [id_dialog]: { loading: false } })
                    }}

                    onClick={(e) => {
                        setData({ [id_dialog]: { disable_animate: true, loading: true } })
                        return onReset(e);

                    }} icon="clear" text="Clear" />}

                <Button disabled={data[id_dialog]?.loading} variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
            </DialogActions>


        </Dialog>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MuiDialog)