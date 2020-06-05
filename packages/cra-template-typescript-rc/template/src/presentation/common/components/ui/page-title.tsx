import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const PageTitleComponent = (props) => {
  const title = props.title || "";
  const subtitle = props.subtitle || "";

  return (
    <div>
      <Box pb="50px">
        <Typography variant="h1">
         {title}
        </Typography>
        <Typography variant="subtitle1">
          {subtitle}
        </Typography>
      </Box>
    </div>
  )
}