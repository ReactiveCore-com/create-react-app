import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Box, Typography, Button, Dialog, DialogContent } from "@material-ui/core";

import iconProvider from "../icons/icon.provider";

const dialogStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: 50,
        },
        messageWrapper: {
            maxWidth: 300,
            marginTop: 30,
            marginBottom: 50,
        },
        buttonsWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& > button": {
                minWidth: 90,
            },
            "& > button + button": {
                marginLeft: 20,
            },
        },
    }),
);

const ConfirmationDialogComponent = (props) => {
    const { open, type = "ok", onCancel, onOk, message } = props;
    const [isOpen, setIsOpen] = useState(false);
    const classes = dialogStyles({});
    const Icon = type !== "ok" ? iconProvider(type) : null;

    const handleCloseDialog = () => {
        if (typeof props.onCancel === "function") {
            onCancel();
        } else {
            // just close dialog
            setIsOpen(false);
        }
    };

    const handleOkBtnClick = () => {
        if (typeof onOk === "function") {
            onOk();
        }
    };

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md">
            <DialogContent className={classes.root}>
                {Icon !== null && (
                    <Box display="flex" justifyContent="center" pt="10px">
                        <Icon width="40" height="40" />
                    </Box>
                )}
                <Box className={classes.messageWrapper}>
                    <Typography variant="h2">{message || "Provide the message!"}</Typography>
                </Box>
                <Box className={classes.buttonsWrapper}>
                    <Button onClick={handleCloseDialog} size="small" variant="outlined">
                        cancel
                    </Button>
                    <Button onClick={handleOkBtnClick} size="small" variant="outlined">
                        ok
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialogComponent;
