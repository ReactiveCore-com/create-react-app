import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Box, Typography, Button, Dialog, DialogContent } from "@material-ui/core";

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
        },
    }),
);

const NotificationModalComponent = (props) => {
    const { open, message } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [notification, setNotification] = useState(message);
    const classes = dialogStyles({});

    const handleCloseDialog = () => {
        if (typeof props.onClose === "function") {
            props.onClose();
        }
    };

    useEffect(() => {
        setIsOpen(open);
        setNotification(message);
    }, [open, message]);

    return (
        <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="md">
            <DialogContent className={classes.root}>
                <Box className={classes.messageWrapper}>
                    <Typography variant="h2">{notification || "Provide the message!"}</Typography>
                </Box>
                <Box className={classes.buttonsWrapper}>
                    <Button onClick={handleCloseDialog} size="small" variant="outlined">
                        ok
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationModalComponent;
