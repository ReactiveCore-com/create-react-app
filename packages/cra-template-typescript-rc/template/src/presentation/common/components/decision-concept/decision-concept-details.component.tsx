import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';
import { Grid, Box, Typography, IconButton } from '@material-ui/core';
import { categoryProvider } from 'common/themes/category.provider';
import { DecisionConceptFormComponent } from './decision-concept-form.component';
import { GuidelineOptionsComponent } from 'guideline/guideline-editor/components/guideline-options.component';
import { IconComponent } from '../ui/icons/icon.component';
import { createSavedDCOptionsFormViewModel } from 'factory/viewmodel/decision-concept.factory';
import { store } from 'core/managers/state-manager';


const styles = makeStyles(theme =>
    createStyles({

        headerName: {
            margin: '0 50px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexShrink: 0,
            flexGrow: 0,
            color: '#333',
            fontSize: 20,
            textTransform: 'uppercase',
            fontWeight: 300
        },
        headerDescription: {
            display: 'block',
            whiteSpace: 'nowrap',
            fontSize: '20px',
            textAlign : 'center',
            color: '#333',
            fontWeight: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
    })
);

export const DecisionConceptDetailsComponent = props => {
    let { dcDetails, sequence } = store.getState();
    let dc = sequence.find((seqItem) => seqItem.step === dcDetails.step);
    const classes = styles({});
    const category = categoryProvider(dc.category.name);

    store.dispatch({
        type : 'setConfiguredStep',
        payload : dc
    });

    const closeDetails = (evt) => {
        store.dispatch({
            type : 'clearDCDetails'
        });
    };

    return (
        <Box
            border="1px solid"
            minWidth="1320px"
            borderRadius="4px"
            borderColor={ category.color }>
            <Box
                display="flex"
                alignItems="center"
                minHeight="75px"
                paddingLeft="50px">
                <IconComponent className={category.name.toLowerCase()} name={category.name} />
                <Box className={ classes.headerName }>
                    { dc.template.displayName}
                </Box>
                <Box className={ classes.headerDescription } flexGrow={1}>
                    { dc.template.description || 'description for a decision concept template' }
                </Box>
                <Box>
                    <IconButton onClick={closeDetails} >
                        <IconComponent name="clear" />
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" padding="35px 40px 40px" style={{ background: category.gradient }}>
                <Box 
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    height="100%"
                    paddingRight="30px">
                    <DecisionConceptFormComponent dc={ dc } disabled/>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    justifyContent="flex-start"
                    height="100%">
                    {/* //TODO: Implement logic for branching view */}
            	    <Typography variant="h6" className="form-label">set options</Typography>
                    <GuidelineOptionsComponent  dc={ dc } supportsYES supportsNO disabled />
                </Box>
            </Box>
        </Box>
    );
};
