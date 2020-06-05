import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { fakeAuth } from "./auth.service";
import { store } from 'core/managers/state-manager';
import { createDCViewModel, createDecisionConceptTemplatesViewModels } from 'factory/viewmodel/decision-concept.factory';
import { getDecisionConcepts, getTemplates } from 'guideline/guideline-editor/decision-concept.service';
import { Logo, Banner } from 'common/components/ui/icons';
import { IconComponent } from 'common/components/ui/icons/icon.component'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  const history = useHistory();
  // we can redirect to guideline-manager only cause user should select guideline
  //const { from } = location.state ? { from: { pathname: '/guideline-manager'} } : { from: { pathname: "/" } };
  const { from } =  { from: { pathname: "/" } };
  const login = () => {
    fakeAuth.authenticate(async () => {
      try {
          let [templates, savedDCs] = await Promise.all([getTemplates(),getDecisionConcepts()]);
          let dcTemplates = await createDecisionConceptTemplatesViewModels(templates);
          store.dispatch({ type: 'setDCTemplates', payload: dcTemplates });
          let dcs = savedDCs.map((sdc:any) => {
              let template = dcTemplates.find((dct:any) => dct.id === sdc.dct_id);
              return {
                  ...createDCViewModel(template, sdc, sdc.configuration_point_values)
              };
          });
          store.dispatch({ type: 'updateSavedDecisionConcepts', payload: dcs });
          history.replace(from);
      } catch(e) {
        console.log('ERROR:' + e);
        throw e;
      }

    });
  };

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
          onClick={ login }
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
