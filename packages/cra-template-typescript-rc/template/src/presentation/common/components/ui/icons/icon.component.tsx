import React from "react";
import { SvgIcon } from "@material-ui/core";
import iconProvider from "./icon.provider";

const IconComponent = (props) => {
    const { name } = props;
    const icon = iconProvider(name);
    return <SvgIcon component={icon} {...props} />;
};

export default IconComponent;
