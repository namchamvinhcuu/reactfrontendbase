import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fade,
    Grow, IconButton, Paper, Slide, Zoom
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MuiButtonAsync from './MuiButtonAsync';

import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Box } from '@mui/system';
import Draggable from 'react-draggable';
import ShortUniqueId from "short-unique-id";

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

export const MuiDialog = ({ isOpen, onClose, title, disable_animate, maxWidth, ...others }) => {

    const { animate, disabledCloseBtn } = others;
    console.log('disabledCloseBtn', disabledCloseBtn)

    const [dialogId, setDialogId] = React.useState(uid());
    const [data, setData] = useState({});

    const PaperComponent = React.useCallback((props) => {
        return (
            <Draggable handle={`#draggable-dialog-${dialogId}`} cancel={'[class*="MuiDialogContent-root"]'}>
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

    return (

        <Dialog
            TransitionComponent={animate === "fade" ? Transition_Fade : animate === "grow" ? Transition_Grow : animate === "slide_down" ? Transition_Slide_Down : Transition_Zoom}
            transitionDuration={disable_animate || (data[dialogId]?.disable_animate === true) ? disable_animate : 250}
            PaperComponent={PaperComponent}
            aria-labelledby={`draggable-dialog-${dialogId}`}
            fullWidth
            maxWidth={maxWidth ?? 'md'}
            open={isOpen}
            {...others}
        >
            <DialogTitle
                sx={{
                    cursor: 'move',
                    textTransform: "uppercase",
                    color: '#0071ba',
                }}
            >
                {title}
                <IconButton
                    disabled={disabledCloseBtn}
                    sx={{
                        top: '-12px',
                        right: '-12px',
                        color: 'cornflowerblue',
                        borderRadius: '50%',
                        position: 'absolute',
                        backgroundColor: '#CCCCCC',
                        width: '35px',
                        height: '35px',
                        '&:hover': {
                            backgroundColor: 'aliceblue',
                            color: 'red'
                        },
                        '&:disabled': {
                            backgroundColor: 'aliceblue',
                        },
                    }}
                    onClick={handleClose} color="primary" >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {others.children}
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MuiDialog)