import React from 'react';
import { ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import { Box, TextField, Typography } from '@material-ui/core';
import { store } from 'core/managers/state-manager';
import { isValidInteger, isNumberNonNegative } from 'core/utils/validation-utils';
import { isEmpty, isNil } from 'core/utils/object-utils';
import { operatorMap } from 'common/constants'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getTemplateByName } from 'common/utils/dc-utils'
import { mediateUpdateTempDC } from 'mediators/update-temp-dc-requester.mediator';

const styles = makeStyles(theme =>
    createStyles({
        thresholdInput: {
            textAlign : 'center'
        }
    })
);

export const ThresholdControl = (props) => {
    let classes = styles({});
    const { disabled, values, minDomainProperty, maxDomainProperty } = props;
    const selectedValues = 
        !!store.getState().selectedSavedDC ? store.getState().selectedSavedDC.values : "" 
        || !!store.getState().dcDetails ? store.getState().dcDetails.values : ""
    const valueSet = !!selectedValues ? [selectedValues[minDomainProperty][0], selectedValues[maxDomainProperty][0]] : ["", ""]
    
    const getOperatorFromValues = (vals) => !!vals ? Math.min(...vals.map(Number)) === 0 ? "<" : ">=" : ""
    const getValueFromOperator = (vals, operator) => {
        vals = [...vals.map(Number)]
        switch (operator) {
            case '>=':
                return vals[0]
            case '>':
                return vals[0] - 1
            case '<':
                return vals[1]
        }
    }
    
    const [operator, setOperator] = React.useState(!!selectedValues ? getOperatorFromValues(valueSet) : "");
    const [inputValue, setInputValue] = React.useState(!!selectedValues ? getValueFromOperator(valueSet, operator) : "0");
    const template = getTemplateByName(props.templateID)

    const createRangeValues = (operator, value) => {
        let min, max;

        if (isEmpty(value) || isNil(value) || !isValidInteger(value) || !isNumberNonNegative(value)) {
            return [
                {
                    domain_property : props.minDomainProperty,
                    values : [""]
                },
                {
                    domain_property : props.maxDomainProperty,
                    values : [""]
                }
            ];
        }

        value = Number(value);

        switch(operator) {
            case '>':
                min = value + 1;
                max = props.max;
                break;
            case '>=':
                min = value;
                max = props.max;
                break;
            case '<':
                min = props.min;
                max = value;
                break;
            case '<=':
                min = props.min;
                max = value + 1;
                break;
        };

        return [
            {
                domain_property : props.minDomainProperty,
                values : [min]
            },
            {
                domain_property : props.maxDomainProperty,
                values : [max]
            }
        ];
    };

    const handleToggle = (event, val) => {
        setOperator(val);
        let tempDC = [
            ...createRangeValues(val, inputValue)
        ];

        store.dispatch(mediateUpdateTempDC(template, tempDC));
    };

    const handleInputChange = (evt) => {
        let val = evt.target.value;
        setInputValue(val)
        let tempDC = [
            ...createRangeValues(operator, val)
        ];

        store.dispatch(mediateUpdateTempDC(template, tempDC));
    };

    return (
        <div>
            <Typography paragraph variant="h6">{props.label}</Typography>
            <Box display="flex" mb="45px">
                <Box mr="30px">
                    <ToggleButtonGroup
                        value={operator}
                        exclusive
                        onChange={handleToggle}
                        className={props.category}
                        aria-label="text alignment"
                    >
                        { 
                            props.operators.map((option, index) => {
                                return (
                                    <ToggleButton
                                        key={index}
                                        value={option}
                                        aria-label={option}
                                        title={option}
                                        disabled={disabled}
                                    >
                                        {option}
                                    </ToggleButton>
                                );
                            })
                        }
                    </ToggleButtonGroup>
                </Box>
                <Box width={100} mr="30px">
                    <TextField 
                        className="DCTextField"
                        value={inputValue}
                        placeholder={props.unit}
                        InputProps={{
                            classes : {
                                input : classes.thresholdInput
                            }
                        }}
                        disabled={disabled}
                        onChange={handleInputChange} 
                    />
                </Box>
                <Box alignSelf="center">
                    <Typography variant="body1">{props.unit}</Typography>
                </Box>
            </Box>
        </div>
    );
};
