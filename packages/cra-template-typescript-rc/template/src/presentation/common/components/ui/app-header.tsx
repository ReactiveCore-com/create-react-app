import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Breadcrumbs, Link, Typography, FormControlLabel, Avatar } from '@material-ui/core';
import { Logo, Banner, User } from './icons';

const useStyles = makeStyles(theme =>
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
            height: '25px',
            margin: '0 0 0 13px'
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
    })
);

const AppHeader = (props) => {
    const classes = useStyles({});

    return (
        <Grid
            className={classes.header}
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="space-between"
        >
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                alignItems="center"
                alignContent="center"
                justifyContent="flex-start"
            >
                <Avatar className={classes.circleImage}>
                    <Logo width="50px" height="50px"/>
                </Avatar>
                <Banner className={classes.banner} />
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                alignItems="center"
                alignContent="center"
                justifyContent="center" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className={classes.link} component='button'>
                            Reactive Core
                        </Link>
                        <Typography variant='h3'>Link</Typography>
                    </Breadcrumbs>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                alignItems="center"
                alignContent="center"
                justifyContent="flex-end"
            >
                <FormControlLabel
                    control={
                        <Avatar className={classes.circleImage}>
                            <User width="50px" height="50px"/>
                        </Avatar>
                    }
                    labelPlacement="start"
                    label=""
                    value=""
                />
            </Box>
        </Grid>
    );
}

export default AppHeader;
