import React, { useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { styled } from "@mui/material/styles"
import { FormattedMessage } from 'react-intl'

const StyledButton = styled(Button)(({ theme, color }) => ({
    minWidth: 0,
    margin: theme.spacing(0.5),
    // backgroundColor: color ? theme.palette[color].light : undefined
}));

const MuiCreateButton = React.forwardRef((props, ref) => {

    const { variant, color, onClick, ...others } = props;

    useImperativeHandle(ref, () => ({

    }));

    return (
        <StyledButton
            startIcon={<AddIcon />}
            variant={variant ?? "contained"}
            color={color ?? "success"}
            onClick={onClick}
            {...others}
        >
            <FormattedMessage id="common.create" />
        </StyledButton>
    )
})

export default MuiCreateButton
