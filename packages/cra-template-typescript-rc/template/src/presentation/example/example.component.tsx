import React from 'react';
import { PageTitleComponent } from 'presentation/common/components/ui/page-title' 
import { Box, Button } from '@material-ui/core';
import { IconComponent } from 'presentation/common/components/ui/icons/icon.component';
import { Link } from 'react-router-dom';
import { ROUTES } from 'presentation/common/constants';

export const ExampleComponent = (props) => {
    return (
        <Box display="flex" flexDirection="column" width={1}>
            <Box display="flex">
                <Box flexGrow={1}>
                    <PageTitleComponent 
                        title="Decision pathway generation"
                        subtitle="View all the decision pathways within the guideline"
                    />
                </Box>
            </Box>
            <Box flexGrow={1}>
            </Box>
            <Box display="flex" justifyContent="center">
                <Box display="flex" >
                    <Button
                        variant="outlined"
                        component={Link}
                        to={ROUTES.EXAMPLE_GRID}
                        startIcon={<IconComponent name="pathway" fontSize="small" />} >
                        view grid
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
