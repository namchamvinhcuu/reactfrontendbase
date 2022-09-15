import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import SearchIcon from '@mui/icons-material/Search'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import ClearIcon from '@mui/icons-material/Clear'
import PrintIcon from '@mui/icons-material/Print'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const MuiButtonAsync = (props) => {
    const mounted = useRef(false);
    const [asyncState, setAsyncState] = React.useState(null);
    const isPending = asyncState === 'pending';
    const isResolved = asyncState === 'resolved';
    const isRejected = asyncState === 'rejected';

    const { onCompleteStateChange, icon, text, ...others } = props;

    useEffect(() => {
        // Anything in here is fired on component mount.
        mounted.current = true;

        return () => {
            // Anything in here is fired on component unmount.
            mounted.current = false;

        }
    }, [])

    const handleClick = (args) => {
        const clickHandler = this.props.onClick;

        if (typeof clickHandler === 'function') {

            setAsyncState('pending')

            const returnFn = clickHandler.apply(null, args);
            if (returnFn && typeof returnFn.then === 'function') {
                returnFn
                    .then(() => {
                        if (!mounted.current) {
                            return;
                        }

                        setAsyncState('resolved');
                    })
                    .catch(error => {
                        if (!mounted.current) {
                            return;
                        }
                        onCompleteStateChange && onCompleteStateChange('rejected');

                        setAsyncState('rejected');
                    });
            } else {
                onCompleteStateChange && onCompleteStateChange(null);
                setAsyncState(null);
            }
        }
    }

    const renderIcon = (icon) => {
        switch (icon) {
            case 'save':
                return <SaveIcon />;
            case 'search':
                return <SearchIcon />
            case 'send':
                return <SendIcon />
            case 'upload':
                return <UploadIcon />
            case 'download':
                return <DownloadIcon />
            case 'print':
                return <PrintIcon />
            case 'clear':
                return <ClearIcon />
            case 'centerfocus':
                return <CenterFocusWeakIcon />
            case 'add':
                return <AddCircleIcon />
            default:
                return '';
        }
    }

    return (
        icon ? <LoadingButton
            loading={isPending}
            startIcon={renderIcon(icon)}

            loadingPosition="start"
            variant="contained"
            color={icon === "clear" ? 'error' : 'primary'}
            {...others}
            onClick={handleClick}
        >
            {text}
        </LoadingButton>
            : <LoadingButton
                loading={isPending}
                variant="contained"
                {...others}
                onClick={handleClick}
            >
                {text}
            </LoadingButton>
    )
}

MuiButtonAsync.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default MuiButtonAsync
