import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            background: 'white',
            borderStyle: 'solid',
            borderWidth: 0,
            color: '#707070',
            margin: '30px 0',
            '& p': {
                textAlign: 'center',
                lineHeight: '14px',
                margin: 0,
                textTransform: 'uppercase',
            },
        },
        dc: {
            width: '250px',
            height: '75px',
            fontSize: '10px',
            borderWidth: '1px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        approveDeny: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            fontSize: '14px',
            borderWidth: '1px',
            borderColor: '#707070',
            height: '50px',
            margin: '42px 0',
            borderRadius: '25px',
            '& > svg': {
                marginRight: '10px',
            },
        },
        dcDetails: {
            borderStyle: 'solid',
            textAlign: 'center',
            width: '40px',
            fontSize: '12px',
            display: 'none',
            alignSelf: 'stretch',
            lineHeight: '75px',
        },
        dcInfo: {
            flexGrow: 1,
            fontSize: '14px',
            padding: '0 6px',
            fontWeight: 'bold',
            whiteSpace: 'pre-wrap',
        },
        showDetails: {
            display: 'block',
        },
        yesno: {
            minWidth: '35px',
            fontWeight: 'bold',
            borderWidth: '0 0 0 1px',
        },
        qnumber: {
            minWidth: '35px',
            fontWeight: 'bold',
            borderWidth: '0 1px 0 0',
        },
        chevron: {
            position: 'absolute',
            left: '50%',
            marginLeft: '-5px',
            bottom: '-7px',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '6px solid #8F65A5',
        },
    }),
);

const ExampleMobileRendererComponent = ({ data }) => {
    const classes: any = useStyles({});

    const handleCardClick = () => {};

    const handleKeyPress = () => {};

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.dc]: true,
            })}
            onClick={handleCardClick}
            onKeyPress={handleKeyPress}
            role='presentation'
        >
            <div
                className={clsx({
                    [classes.qnumber]: true,
                    [classes.showDetails]: true,
                    [classes.dcDetails]: true,
                })}
            >
                {data.make}
            </div>
            <div className={classes.dcInfo}>
                <p>{data.make}</p>
                <p>{data.model}</p>
            </div>
            <div
                className={clsx({
                    [classes.yesno]: true,
                    [classes.dcDetails]: true,
                    [classes.showDetails]: true,
                })}
            >
                {data.year}
            </div>
        </div>
    );
};

export default ExampleMobileRendererComponent;
