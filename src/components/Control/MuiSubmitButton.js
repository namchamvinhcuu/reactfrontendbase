import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { styled } from "@mui/material/styles"
import { FormattedMessage } from 'react-intl'

const StyledButton = styled(LoadingButton)(({ theme, color }) => ({
    minWidth: 0,
    margin: theme.spacing(0.5),
    backgroundColor: color ? theme.palette[color].light : undefined
}));

export default function MuiSubmitButton(props) {

    const { loading, variant, text } = props;

    const str = `common.${text}`;

    return (
        <StyledButton
            loading={loading ?? false}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant={variant ?? "contained"}
            type='submit'
        >
            <FormattedMessage id={str} />
        </StyledButton>
    )
}
