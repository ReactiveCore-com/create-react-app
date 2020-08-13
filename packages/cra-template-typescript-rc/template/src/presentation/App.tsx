import React from "react";
import "./App.scss";
import RoutesComponent from "./App.routes";
import { setHost } from "environment";
import "typeface-roboto";

const App = (props) => {
    const { host } = props;
    setHost(host);
    return <RoutesComponent />;
};

export default App;
