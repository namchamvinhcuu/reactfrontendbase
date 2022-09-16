import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fade,
    Grow, IconButton, Paper, Slide, Zoom
} from '@mui/material';
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

export const MuiDialog = ({ isOpen, onClose, onReset, title, disable_animate, maxWidth, ...others }) => {

    const { animate } = others;

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
            maxWidth={maxWidth}
            open={isOpen}
            {...others}
        >
            <form>
                <Paper>
                    <DialogTitle style={{ height: 'auto', cursor: 'move' }}>
                        {title}
                        <IconButton sx={{
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
                        }} onClick={handleClose} color="primary" >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                </Paper>

                <Box mt={2}>
                    <DialogContent>
                        {others.children}
                    </DialogContent>
                </Box>

                <DialogActions>

                    <MuiButtonAsync
                        onCompleteStateChange={state => {
                            setData({ [dialogId]: { loading: false } })
                        }}

                        onClick={(e) => {
                            setData({ [dialogId]: { disable_animate: true, loading: true } })
                            // return onSave(e);
                        }}
                        icon="save"
                        text="Save"
                        type='submit'
                    />

                    <Button
                        disabled={data[dialogId]?.loading}
                        variant="outlined"
                        color="secondary"
                        onClick={onReset}
                        startIcon={<RefreshIcon />}
                    >
                        reset
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MuiDialog)