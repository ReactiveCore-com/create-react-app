import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Box, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Warning } from "presentation/common/components/ui/icons";

const dialogStyles = makeStyles(() =>
    createStyles({
        content: {
            padding: 50,
            minWidth: 300,
            textAlign: "center",
        },
        icon: {
            marginBottom: "40px",
            marginTop: "20px",
        },
        message: {
            fontSize: "24px",
            maxWidth: 300,
            fontWeight: 500,
        },
        notification: {},
        confirmation: {},
        error: {
            fontSize: "20px",
            maxWidth: 425,
        },
        warning: {},
        actions: {
            justifyContent: "center",
            paddingBottom: 40,
            "& > button": {
                minWidth: 90,
            },
        },
    }),
);

export enum DIALOG_TYPE {
    WARNING,
    ERROR,
    NOTIFICATION,
    CONFIRMATION,
}

const DialogContentComponent = (props) => {
    const { type, message } = props;
    const classes = dialogStyles({});

    let Icon: any = null;

    switch (type) {
        case DIALOG_TYPE.ERROR:
            Icon = Warning;
            break;
        case DIALOG_TYPE.NOTIFICATION:
            Icon = Warning;
            break;
        case DIALOG_TYPE.CONFIRMATION:
            Icon = Warning;
            break;
        case DIALOG_TYPE.WARNING:
            Icon = Warning;
            break;
    }

    return (
        <DialogContent className={classes.content}>
            {Icon !== null && <Icon width="40" height="40" className={classes.icon} />}
            <Box
                className={clsx({
                    [classes.message]: true,
                    [classes.notification]: type === DIALOG_TYPE.NOTIFICATION,
                    [classes.confirmation]: type === DIALOG_TYPE.CONFIRMATION,
                    [classes.warning]: type === DIALOG_TYPE.WARNING,
                    [classes.error]: type === DIALOG_TYPE.ERROR,
                })}
            >
                {message}
            </Box>
        </DialogContent>
    );
};

export const ModalDialogComponent = (props) => {
    const { open, message, type, onOk, onCancel } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [notification, setNotification] = useState(message);
    const hasOkBtn = typeof onOk === "function";
    const hasCancelBtn = typeof onCancel === "function";
    const classes = dialogStyles({});

    const handleCancelBtnClick = () => {
        if (hasCancelBtn) {
            onCancel();
        }
    };

    const handleOkBtnClick = () => {
        if (hasOkBtn) {
            onOk();
        }
    };

    useEffect(() => {
        setIsOpen(open);
        setNotification(message);
    }, [open, message]);

    return (
        <Dialog open={isOpen} disableBackdropClick maxWidth="md">
            <DialogContentComponent type={type} message={notification} />
            <DialogActions className={classes.actions}>
                {hasCancelBtn && (
                    <Button onClick={handleCancelBtnClick} size="small" variant="outlined">
                        cancel
                    </Button>
                )}
                {hasOkBtn && (
                    <Button onClick={handleOkBtnClick} size="small" variant="outlined">
                        ok
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
