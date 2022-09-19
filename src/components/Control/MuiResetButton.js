import React, { useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh'
import { styled } from "@mui/material/styles"
import { FormattedMessage } from 'react-intl'

const StyledButton = styled(Button)(({ theme, color }) => ({
    minWidth: 0,
    margin: theme.spacing(0.5),
    // backgroundColor: color ? theme.palette[color].light : undefined
}));

const MuiResetButton = React.forwardRef((props, ref) => {

    const { variant, color, onClick, ...others } = props;

    useImperativeHandle(ref, () => ({

    }));

    return (
        <StyledButton
            startIcon={<RefreshIcon />}
            variant={variant ?? "outlined"}
            color={color ?? "secondary"}
            onClick={onClick}
            {...others}
        >
            <FormattedMessage id="common.reset" />
        </StyledButton>
    )
})

export default MuiResetButton
