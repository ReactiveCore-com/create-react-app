import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Chip} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { store } from 'core/managers/state-manager';
import { flatten, reject, map } from 'core/utils/list-utils';
import { isNil, prop } from 'core/utils/object-utils';
import { pipe } from 'core/utils/func-utils';
import { mediateUpdateTempDC } from 'mediators/update-temp-dc-requester.mediator';

const styles = makeStyles(theme =>
    createStyles({
        controlLabel: {
            display: 'block',
            textTransform: 'uppercase',
            fontSize: 16,
            padding: '0 0 15px'
        },
        autoCompleteBox: {
            backgroundColor: "#fff",
            marginBottom: 45
        },
        optionLabel: {
            paddingBottom: "15px"
        }
    })
);

export const AutocompleteControl = props => {
    const template = store.getState().selectedTemplate;
    const optionMapper = (option: any) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    }

    const normalizeSelectedValues = (items) => {
        return !!items ? props.selectItems.filter((selectItem) => items.find((item) => item === selectItem.id)) : []
    }

    const handleChange = (ev, selection) => {
        ev.stopPropagation();
        const values = pipe(
            flatten,
            reject(isNil),
            map(prop('id'))
        )([selection]);
        setSelected(selection);
        let tempDC = [
            {
                domain_property : props.id,
                values
            }
        ];

        store.dispatch(mediateUpdateTempDC(template, tempDC));
    };
    const { disabled, selectItems, values, multi } = props;
    const classes = styles({});
    const [selected, setSelected] = useState(multi ? [] : null);
    const options = selectItems.map(optionMapper);
    const isOptionSelected = (option) => {
        return selected !== null ? selected.find(s => s.label === option.label) !== undefined : false
    }

    useEffect(() => {
        const selectedValues = normalizeSelectedValues(values).map(optionMapper);
        setSelected(multi ? selectedValues : selectedValues[0]);
    }, [values]);

    return (
        <>
            <Typography variant="h6" className="form-label">{props.label}</Typography>
            <Autocomplete
                value={selected}
                disabled={disabled}
                className={classes.autoCompleteBox}
                onChange={handleChange}
                multiple={multi}
                filterSelectedOptions
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={option => props.group ? option.firstLetter : null}
                getOptionLabel={option => !!option && !!option.label ? option.label : ''} 
                size="small"
                getOptionDisabled={option => !!multi ? isOptionSelected(option) : false}
                renderInput={params => <TextField placeholder={disabled ? '' : props.placeholderText} fullWidth {...params}  />}
                renderOption={option => <Typography variant="body1" className={classes.optionLabel}>{option.label}</Typography>}
                ChipProps={{ disabled: disabled }}
            />
        </>
    );
};
