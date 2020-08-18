import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Breadcrumbs, Button, Typography, FormControlLabel, Avatar } from '@material-ui/core';
import IconComponent from 'presentation/common/components/ui/icons/icon.component';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            width: '100%',
            height: '75px',
            color: 'white',
            backgroundColor: 'white',
        },
        circleImage: {
            width: '50px',
            height: '50px',
            margin: '0 13px',
            color: 'white',
            backgroundColor: 'white',
        },
        banner: {
            fontSize: '200px',
            height: 'auto',
        },
        user: {
            fontSize: '48px',
        },
        logo: {
            fontSize: '50px',
        },
        link: {
            lineHeight: '25px',
            fontSize: '18px',
            color: '#666666',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'none',
            },
        },
    }),
);

const AppHeader = () => {
    const classes = useStyles({});

    return (
        <Grid
            className={classes.header}
            container
            direction='row'
            alignItems='center'
            alignContent='center'
            justify='space-between'
        >
            <Box
                display='flex'
                flexDirection='row'
                flexWrap='nowrap'
                alignItems='center'
                alignContent='center'
                justifyContent='flex-start'
            >
                <Avatar className={classes.circleImage}>
                    <IconComponent className={classes.logo} name='logo' viewBox='0 0 100 100' />
                </Avatar>
                <IconComponent className={classes.banner} name='banner' viewBox='0 0 200 30' />
            </Box>
            <Box
                display='flex'
                flexDirection='row'
                flexWrap='nowrap'
                alignItems='center'
                alignContent='center'
                justifyContent='center'
            >
                <Breadcrumbs aria-label='breadcrumb'>
                    <Button className={classes.link} component='button'>
                        Reactive Core
                    </Button>
                    <Typography variant='h3'>Link</Typography>
                </Breadcrumbs>
            </Box>
            <Box
                display='flex'
                flexDirection='row'
                flexWrap='nowrap'
                alignItems='center'
                alignContent='center'
                justifyContent='flex-end'
            >
                <FormControlLabel
                    control={
                        <Avatar className={classes.circleImage}>
                            <IconComponent className={classes.user} name='user' viewBox='0 0 50 50' />
                        </Avatar>
                    }
                    labelPlacement='start'
                    label=''
                    value=''
                />
            </Box>
        </Grid>
    );
};

export default AppHeader;
