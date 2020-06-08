import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Logo, Banner } from 'presentation/common/components/ui/icons';
import { IconComponent } from 'presentation/common/components/ui/icons/icon.component'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link  } from 'react-router-dom';

const styles = makeStyles(theme =>
  createStyles({
    root: {
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #ccc",
      borderRadius: "10px",
      margin: "-200px 0 0 -200px",
      width: "400px",
      height: "400px",
      position: "absolute",
      top: "50%",
      left: "50%"
    },
    DCLoginForm: {
      display: "flex",
      flexDirection: "column",
      width: "250px",
      alignItems: "center"
    },
    RCLogoWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: "0 0 30px",
      "& > svg + svg": {
        marginLeft: "15px"
      }
    },
    //TODO: check why Mui theme not working for login page.
    DCButton: {
      padding: '10px 30px',
      borderRadius: 25,
      border: '1px solid #808080',
      color: '#808080',
      flexGrow: 0,
      '& > span > span': {
        marginRight: '15px'
      },
      '&:hover': {
        color: '#FFF',
        backgroundColor: '#808080'
      }
    },
    ForgotPassLabel: {
      fontSize: "10px",
      paddingTop: "20px",
      color: "#777"
    }
  })
);

export const LoginComponent = props => {
  const classes = styles({});

  return (
    <div className={classes.root}>
      <div className={classes.RCLogoWrapper}>
        <Logo width="50px" height="50px"/>
        <Banner />
      </div>
      <form className={classes.DCLoginForm} noValidate autoComplete="off">
        <TextField fullWidth label="User Name" size="small" />
        <TextField fullWidth label="Password" size="small" />
        <br />
        <br />
        <Button
          className={ classes.DCButton }
          component={ Link }
          to="/example"
          variant="outlined"
          startIcon={<IconComponent name="login" fontSize="small" />}
        >
          login
        </Button>
      </form>
      <span className={classes.ForgotPassLabel}>Forgot password?</span>
    </div>
  );
};
