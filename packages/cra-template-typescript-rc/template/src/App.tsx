import React from 'react';
import './App.scss';
import { setHost } from './environment';
import NavigationComponent from 'presentation/common/components/navigation.component';
import 'typeface-roboto';

export const App = (props) => {
    setHost(props.host);
    return (
        <NavigationComponent />
    );
}
