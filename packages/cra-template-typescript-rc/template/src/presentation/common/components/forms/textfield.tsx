import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme =>
  createStyles({
      DCTextField: {
          fontSize: '10px',
          '& > input': {
              padding: '6px 5px'
          },
          '& > fieldset': {
              '&:hover': {
                  borderColor: '#80bdff'
              }
          },
          backgroundColor: "#fff",
      }
  })
);

export const DCTextField = props => {
  const classes = styles({})

  return (
      <div >
          <Tooltip placement="top" arrow title={props.value}>
          <TextField
                className={classes.DCTextField}
                size="small"
                multiline
                variant="outlined"
                value={props.value}
                disabled
          />
          </Tooltip>
      </div>
  )
}
