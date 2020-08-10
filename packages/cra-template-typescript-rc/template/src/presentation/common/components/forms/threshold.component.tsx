import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Box, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import store from "core/managers/state-manager";

const styles = makeStyles(() =>
    createStyles({
        thresholdInput: {
            textAlign: "center",
        },
    }),
);

const ThresholdControl = (props) => {
    const classes = styles({});
    const { disabled, minDomainProperty, maxDomainProperty, label, category, operators, unit } = props;

    let selectedValues;
    if (store.getState().selectedSavedDC) {
        selectedValues = store.getState().selectedSavedDC.values;
    } else if ("" || !!store.getState().dcDetails) {
        selectedValues = store.getState().dcDetails.values;
    } else {
        selectedValues = "";
    }

    const valueSet = selectedValues
        ? [selectedValues[minDomainProperty][0], selectedValues[maxDomainProperty][0]]
        : ["", ""];

    const getOperatorFromValues = (vals) => {
        let returnVal;
        if (vals) {
            if (Math.min(...vals.map(Number)) === 0) {
                returnVal = "<";
            } else {
                returnVal = ">=";
            }
        } else {
            returnVal = "";
        }

        return returnVal;
    };

    const getValueFromOperator = (vals, operator) => {
        const curVals = [...vals.map(Number)];
        switch (operator) {
            case ">=":
                return curVals[0];
            case ">":
                return curVals[0] - 1;
            case "<":
                return curVals[1];
            default:
                return null;
        }
    };

    const [operator, setOperator] = React.useState(selectedValues ? getOperatorFromValues(valueSet) : "");
    const [inputValue, setInputValue] = React.useState(selectedValues ? getValueFromOperator(valueSet, operator) : "0");

    const handleToggle = (event, val) => {
        setOperator(val);
    };

    const handleInputChange = (evt) => {
        const val = evt.target.value;
        setInputValue(val);
    };

    return (
        <div>
            <Typography paragraph variant="h6">
                {label}
            </Typography>
            <Box display="flex" mb="45px">
                <Box mr="30px">
                    <ToggleButtonGroup
                        value={operator}
                        exclusive
                        onChange={handleToggle}
                        className={category}
                        aria-label="text alignment"
                    >
                        {operators.map((option) => {
                            return (
                                <ToggleButton value={option} aria-label={option} title={option} disabled={disabled}>
                                    {option}
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
                </Box>
                <Box width={100} mr="30px">
                    <TextField
                        className="DCTextField"
                        value={inputValue}
                        placeholder={unit}
                        InputProps={{
                            classes: {
                                input: classes.thresholdInput,
                            },
                        }}
                        disabled={disabled}
                        onChange={handleInputChange}
                    />
                </Box>
                <Box alignSelf="center">
                    <Typography variant="body1">{unit}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default ThresholdControl;
