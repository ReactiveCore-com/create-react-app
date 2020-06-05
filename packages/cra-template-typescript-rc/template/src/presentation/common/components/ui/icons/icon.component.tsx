import React from 'react';
import { SvgIcon, Icon } from '@material-ui/core';
import { iconProvider } from './icon.provider';

export const IconComponent = props => {
    const icon = iconProvider(props.name);
    return (
        <SvgIcon component={icon} {...props} />
    );
};