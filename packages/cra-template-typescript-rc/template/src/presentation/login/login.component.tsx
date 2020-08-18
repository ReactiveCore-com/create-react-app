import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconComponent from 'presentation/common/components/ui/icons/icon.component';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

const styles = makeStyles(() =>
    createStyles({
        root: {
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '10px',
            margin: '-200px 0 0 -200px',
            width: '400px',
            height: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
        },
        RCLogoWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 0 30px',
            '& > svg + svg': {
                marginLeft: '15px',
            },
        },
        banner: {
            fontSize: '200px',
            height: 'auto',
        },
        logo: {
            fontSize: '50px',
        },
        ForgotPassLabel: {
            fontSize: '10px',
            paddingTop: '20px',
            color: '#777',
        },
    }),
);

const LoginComponent = () => {
    const classes = styles({});

    return (
        <div className={classes.root}>
            <div className={classes.RCLogoWrapper}>
                <IconComponent className={classes.logo} name='logo' viewBox='0 0 100 100' />
                <IconComponent className={classes.banner} name='banner' viewBox='0 0 200 30' />
            </div>
            <form noValidate autoComplete='off'>
                <Box width='250px' alignItems='center' display='flex' flexDirection='column'>
                    <TextField InputProps={{ disableUnderline: false }} fullWidth label='User Name' size='small' />
                    <TextField InputProps={{ disableUnderline: false }} fullWidth label='Password' size='small' />
                    <br />
                    <br />
                    <Button
                        component={Link}
                        to='/example'
                        variant='outlined'
                        startIcon={<IconComponent name='login' fontSize='small' />}
                    >
                        login
                    </Button>
                </Box>
            </form>
            <span className={classes.ForgotPassLabel}>Forgot password?</span>
        </div>
    );
};

export default LoginComponent;
