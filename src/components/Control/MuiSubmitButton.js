import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
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

    const renderIcon = (text) => {
        switch (text) {
            case 'save':
                return <SaveIcon />;
            case 'create':
                return <AddIcon />
            default:
                return '';
        }
    }

    const renderColor = (text) => {
        switch (text) {
            case 'save':
                return 'primary';
            case 'create':
                return 'success';
            default:
                return '';
        }
    }

    return (
        <StyledButton
            loading={loading ?? false}
            loadingPosition="start"
            // startIcon={<SaveIcon />}
            startIcon={renderIcon(text)}
            variant={variant ?? "contained"}
            type='submit'
            color={renderColor(text)}
        >
            <FormattedMessage id={str} />
        </StyledButton>
    )
}
