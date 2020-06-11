import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import { store } from 'core/managers/state-manager';

const styles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '0 50px 50px'
        },
        diagnosisConceptBox: {
            justifyContent: "space-between", 
        },
        controlsDetailsButtons: {
            marginTop: '50px',
            textAlign: 'right',
            '& button + button': {
                marginLeft: '15px'
            }
        },
        controlListItem: {
            fontSize: '12px'
        },
        dropdown : {
            width : '190px'
        },
        controlsDetails: {
            display: 'flex',
            paddingTop: '50px',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        controlsDetailsDescr: {
            fontSize: '12px',
            maxWidth: '200px',
            color: '#777'
        },
        controlWrapper: {
            width: '200px',
            paddingBottom: '40px',
            '& > *': {
            }
        },
        controlLabel: {
            display: 'block',
            textTransform: 'uppercase',
            fontSize: 16,
            padding: '45px 0 15px'
        },
        nameLabel: {
            paddingBottom : '5px',
            '& input' : {
                width : '220px',
                textOverflow : 'ellipsis',
                whiteSpace : 'nowrap'
            }
        },
        setOptionBox: {
            borderLeft: '1px solid #ccc'
        },
        buttonDiv: {
            paddingRight: "15px"
        },
        toggleContainer: {
            margin: theme.spacing(2, 0),
        },
        dayTextInput: {
            backgroundColor: "#fff",
            width: "100px",
            paddingLeft: "5px"
        },
        sliderBox: {
            paddingRight: "50px"
        }, 
        toggleButtons: {
            width: "30px",
            height: "30px"
        },
        ageReqLabel: {
            paddingLeft: "0px!important",
            display: "contents!important",
            paddingRight: "10px" 
        },
        autoCompleteBox: {
            width: 230,
            backgroundColor: "#fff"
        },
        autoCompleteDiv: {
            paddingTop: "10px"
        }
    })
);

export const TextControl = props => {
    const classes = styles({});
    let { disabled, values } = props;

    const handleChange = (ev) => {
        ev.stopPropagation();
        let tempDC = [
            {
                domain_property : props.id,
                values : [ev.target.value]
            }
        ];

        //store.dispatch(mediateUpdateTempDC(template, tempDC));
    };

    return (
        <div className={classes.controlWrapper}>
            <span className={classes.controlLabel}>{props.label}</span>
            <TextField className="DCTextField" onChange={handleChange} disabled={disabled} value={values}/>
        </div>
    );
};

export const SelectControl = props => {
    const { disabled, values } = props;
    const classes = styles({});
    const [selectedItems, setSelectedItems] = React.useState(values || []);
    // updating to use as a key TemplateName + domainName of the dcm since we can have multiple dcm per template
    const handleChange = ev => {
        ev.stopPropagation();
        let values = props.multi ? props.join ? [ev.target.value.sort().join(props.join)] : ev.target.value : [ev.target.value] 
        let tempDC = [
            {
                domain_property : props.id,
                values
            }
        ];
        //store.dispatch(mediateUpdateTempDC(template, tempDC));
        setSelectedItems(ev.target.value);
    };
    let selectItems = props.selectItems.map(item => {
        return (
            <MenuItem
                key={item.id}
                value={item.id}
                disabled={item.disabled}
                className={classes.controlListItem}
            >
                {item.label}
            </MenuItem>
        );
    });
    return (
        <div className={classes.controlWrapper}>
            <span className={classes.controlLabel}>{props.label}</span>
                <Select
                    disabled={disabled}
                    displayEmpty
                    className={classes.dropdown}
                    multiple={Boolean(props.multi)}
                    value={selectedItems}
                    onChange={handleChange}
                >
                    {selectItems}
                </Select>
        </div>
    );
};

export const RangeControl = props => {
    const { disabled } = props;
    const classes = styles({});
    const [value, setValue] = React.useState(0)
    const [alignment, setAlignment] = React.useState("");

    const handleRangeValChanged = (evt, val) => {
        setValue(val);
        let values = [`${alignment} ${val} ${props.unit}`];
        let tempDC = [
            {
                domain_property : props.id,
                values
            }
        ];
        //store.dispatch(mediateUpdateTempDC(template, tempDC));
    };

    let marks = [
        {
            value : props.min,
            label : props.min
        },
        {
            value : props.max,
            label : `${props.max} ${props.unit}` 
        }
    ];

    return (
        <div className={classes.controlWrapper}>
            <div className={classes.sliderBox}>
                <Slider
                    onChange={handleRangeValChanged}
                    value={value}
                    aria-labelledby="continuous-slider"
                    defaultValue={props.defaultValue}
                    valueLabelDisplay="auto"
                    step={props.step}
                    marks={marks}
                    min={props.min}
                    max={props.max}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export const ToggleControl = (props) => {
    const classes = styles({});
    const [alignment, setAlignment] = React.useState("");
    
    const handleToggle = (event, val ) => {
        setAlignment(val);
        let values = [val];
        let tempDC = [
            {
                domain_property : props.id,
                values 
            }
        ];
        //store.dispatch(mediateUpdateTempDC(template, tempDC));
    }

    return (
        <div>
            <div className={classes.toggleContainer}>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleToggle}
                    aria-label="text alignment"
                >   
                    { 
                        props.options.map((option) => {
                            return (
                                    <ToggleButton value={option} aria-label={option} title={option}>
                                        {option}
                                    </ToggleButton>
                                    );
                        })
                    }
                </ToggleButtonGroup>
            </div>
        </div>
    )
};
