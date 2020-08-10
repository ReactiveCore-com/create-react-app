import React from "react";
import { Box, Typography } from "@material-ui/core";

const PageTitleComponent = (props) => {
    const { title = "", subtitle = "" } = props;

    return (
        <div>
            <Box pb="50px">
                <Typography variant="h1">{title}</Typography>
                <Typography variant="subtitle1">{subtitle}</Typography>
            </Box>
        </div>
    );
};

export default PageTitleComponent;
