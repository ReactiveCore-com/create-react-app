import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Box, Typography, Button, Dialog, DialogContent } from '@material-ui/core';
import { Warning } from 'presentation/common/components/ui/icons';

const dialogStyles = makeStyles(theme => createStyles({
    root: {
        padding: 50
    },
    messageWrapper: {
        maxWidth: 300,
        marginTop: 30,
        marginBottom: 50
    },
    buttonsWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& > button" : {
            minWidth: 90
        },
        "& > button + button": {
            marginLeft: 20
        }
    }
}))

export const ConfirmationDialogComponent = props => {
    const { open, type } = props;
    const [isOpen, setIsOpen] = useState(false);
    const classes = dialogStyles({});

    let Icon: any = null;

    switch (type) {
        case 'warning': Icon = Warning; break; 
    }

    const handleCloseDialog = () => {
        if (typeof props.onCancel === 'function') {
            props.onCancel();
        } else {
            //just close dialog
            setIsOpen(false);
        }
    }

    const handleOkBtnClick = () => {
        if (typeof props.onOk === 'function') {
            props.onOk();
        }
    }

    useEffect(() => {
        setIsOpen(open);
    }, [open])

    return (
        <Dialog
            open={ isOpen }
            onClose={ handleCloseDialog }
            maxWidth="md" >
            <DialogContent className={ classes.root }>
                {
                Icon !== null && 
                <Box display="flex" justifyContent="center" pt="10px">
                    <Icon width="40" height="40" />
                </Box>
                }
                <Box className={ classes.messageWrapper }>
                    <Typography variant="h2" >{ props.message || 'Provide the message!'}</Typography>
                </Box>
                <Box className={classes.buttonsWrapper}>
                    <Button
                        onClick={ handleCloseDialog }
                        size="small"
                        variant="outlined">
                        cancel
                    </Button>
                    <Button
                        onClick={ handleOkBtnClick }
                        size="small"
                        variant="outlined">
                        ok
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>       
    );
};
