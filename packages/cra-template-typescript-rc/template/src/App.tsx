import React from "react";
import "./App.scss";
import NavigationComponent from "presentation/common/components/navigation.component";
import { setHost } from "./environment";
import "typeface-roboto";

const App = (props) => {
    const { host } = props;
    setHost(host);
    return <NavigationComponent />;
};

export default App;
