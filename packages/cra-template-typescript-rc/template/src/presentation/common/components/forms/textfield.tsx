import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(() =>
    createStyles({
        DCTextField: {
            fontSize: "10px",
            "& > input": {
                padding: "6px 5px",
            },
            "& > fieldset": {
                "&:hover": {
                    borderColor: "#80bdff",
                },
            },
            backgroundColor: "#fff",
        },
    }),
);

const DCTextField = (props) => {
    const { value } = props;
    const classes = styles({});

    return (
        <div>
            <Tooltip placement="top" arrow title={value}>
                <TextField
                    className={classes.DCTextField}
                    size="small"
                    multiline
                    variant="outlined"
                    value={value}
                    disabled
                />
            </Tooltip>
        </div>
    );
};

export default DCTextField;
