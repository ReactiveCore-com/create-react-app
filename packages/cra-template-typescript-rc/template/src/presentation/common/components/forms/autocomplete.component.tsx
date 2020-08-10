import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const styles = makeStyles(() =>
    createStyles({
        controlLabel: {
            display: "block",
            textTransform: "uppercase",
            fontSize: 16,
            padding: "0 0 15px",
        },
        autoCompleteBox: {
            backgroundColor: "#fff",
            marginBottom: 45,
        },
        optionLabel: {
            paddingBottom: "15px",
        },
    }),
);

const AutocompleteControl = (props) => {
    // const template = store.getState().selectedTemplate;<
    const { disabled, selectItems, values, multi, label } = props;
    const classes = styles({});
    const [selected, setSelected] = useState(multi ? [] : null);

    const optionMapper = (option: any) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
        };
    };

    const options = selectItems.map(optionMapper);

    const handleChange = (ev, selection) => {
        ev.stopPropagation();

        setSelected(selection);
    };

    const isOptionSelected = (option) => {
        return selected !== null ? selected.find((s) => s.label === option.label) !== undefined : false;
    };

    useEffect(() => {
        const normalizeSelectedValues = (items) => {
            return items ? selectItems.filter((selectItem) => items.find((item) => item === selectItem.id)) : [];
        };

        const selectedValues = normalizeSelectedValues(values).map(optionMapper);
        setSelected(multi ? selectedValues : selectedValues[0]);
    }, [values, multi, selectItems]);

    return (
        <>
            <Typography variant="h6" className="form-label">
                {label}
            </Typography>
            <Autocomplete
                value={selected}
                disabled={disabled}
                className={classes.autoCompleteBox}
                onChange={handleChange}
                multiple={multi}
                filterSelectedOptions
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => (props.group ? option.firstLetter : null)}
                getOptionLabel={(option) => (!!option && !!option.label ? option.label : "")}
                size="small"
                getOptionDisabled={(option) => (multi ? isOptionSelected(option) : false)}
                renderInput={(params) => (
                    <TextField placeholder={disabled ? "" : props.placeholderText} fullWidth {...params} />
                )}
                renderOption={(option) => (
                    <Typography variant="body1" className={classes.optionLabel}>
                        {option.label}
                    </Typography>
                )}
                ChipProps={{ disabled }}
            />
        </>
    );
};

export default AutocompleteControl;
