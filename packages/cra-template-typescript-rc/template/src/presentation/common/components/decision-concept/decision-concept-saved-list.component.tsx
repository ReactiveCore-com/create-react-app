import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box, Typography, Button, createStyles, makeStyles } from '@material-ui/core';
import { store } from 'core/managers/state-manager';
import { DCBorder } from 'common/components/ui/category-border';
import { categoryProvider } from 'common/themes/category.provider';
import { getSavedDecisionConceptsForTemplate } from 'common/utils/dc-utils';
import { IconComponent } from 'common/components/ui/icons/icon.component';
import { USER_MESSAGES } from 'common/constants'
import { createDCCardViewModels } from 'factory/viewmodel/decision-concept.factory';


const cardStyles = makeStyles(theme =>
    createStyles({
        root : {
            display: 'flex',
            alignItems: 'center',
            borderRadius: 5,
            border: '1px solid',
            padding: '5px 10px'
        }
    })
);


const DCCard = (props) => {
    const { dcCardViewModel } = props;
    const classes = cardStyles({});
    const category = categoryProvider(dcCardViewModel.category.name);
    return (
        <Paper
            elevation={0}
            className={ classes.root }
            style={{ borderColor: category.color }}>
            <DCBorder category={dcCardViewModel.category} />
            <Box pl="20px">
                <Typography
                    variant="h2"
                    className={category.name.toLowerCase()}>
                    { dcCardViewModel.displayName }
                </Typography>
            </Box>
        </Paper>
    );
};


export const DecisionConceptSavedListComponent = (props) => {
    let { onCardClick, onNewBtnClick } = props;
    const [dcTemplate, setDcTemplate] = useState(store.getState().selectedTemplate);
    let { savedDecisionConcepts } = store.getState();
    let savedDCByTemplate = getSavedDecisionConceptsForTemplate(dcTemplate.name, savedDecisionConcepts);
    let dcCardViewModels = createDCCardViewModels(savedDCByTemplate);

    const handleCardClick = (dcCardViewModel) => {
        if (typeof onCardClick === 'function') {
            let savedDC = savedDecisionConcepts.find((sdc) => sdc.id === dcCardViewModel.id);
            onCardClick(savedDC);
        }
    };

    const handleNewBtnClick = () => {
        if (typeof onNewBtnClick === 'function') {
            onNewBtnClick();
        }
    };

    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            let { selectedTemplate } = store.getState();
            setDcTemplate(selectedTemplate);
        });
        return () => {
            unsubscribe();
        };
    }, [dcTemplate]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height={1}
            width={1}
        >
            <Box>
                <Box pb="30px">
                    <Typography variant="h2">
                            { !!dcCardViewModels.length ? USER_MESSAGES.CONFIGURE_OR_SELECT : USER_MESSAGES.NO_DC }
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                {
                    dcCardViewModels.map((dcCardViewModel, index) => {
                        return (
                            <Grid key={`${dcCardViewModel.id}-${index}`} item xs={4}>
                                <Box onClick={ () => handleCardClick(dcCardViewModel) }>
                                    <DCCard dcCardViewModel={dcCardViewModel} />
                                </Box>
                            </Grid>
                        );
                    }) 
                } 
                </Grid>
            </Box>
            <Box display="flex" justifyContent="flex-end" paddingTop="40px">
                <Button
                    onClick={ handleNewBtnClick }
                    variant="outlined"
                    startIcon={<IconComponent name="settings" fontSize="small"/>}>
                    Configure new concept
                </Button>
            </Box>
        </Box>
    );
};
