import React from 'react';
import './App.scss';
import { setHost } from 'environment';
import RoutesComponent from './App.routes';
import 'typeface-roboto';

const App = (props) => {
    const { host } = props;
    setHost(host);
    return <RoutesComponent />;
};

export default App;
