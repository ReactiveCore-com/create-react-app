import React from 'react';
import { AutocompleteControl } from './autocomplete.component';
import { ThresholdControl } from './threshold.component';
import { TextControl, SelectControl, RangeControl, ToggleControl } from './form.components';

export const formComponentsProvider = (disabled, configuration, values) => {
    let _control;
    switch (configuration.type) {
        case 'dropdown':
            _control = <SelectControl
                            key={configuration.id}
                            selectedItems={configuration.attrs.selected}
                            disabled={disabled}
                            values={values}
                            {...configuration.attrs} />
            break;
        case 'range':
            _control = <RangeControl
                            disabled={disabled}
                            key={configuration.id}
                            values={values}
                            {...configuration.attrs} />;
            break;
        case 'textfield':
            _control = <TextControl
                            key={configuration.id}
                            disabled={disabled}
                            values={values}
                            {...configuration.attrs} />;
            break;
        case 'autocomplete':
            _control = <AutocompleteControl
                            key={configuration.id}
                            disabled={disabled}
                            values={values}
                            {...configuration.attrs} />;
            break;
        case 'threshold':
            _control = <ThresholdControl disabled={disabled} key={configuration.id} values={values} {...configuration.attrs} />;
            break;
        case 'toggle':
            _control = <ToggleControl disabled={disabled} key={configuration.id} {...configuration.attrs} />;
            break;
        default:
            console.log(configuration);
    }
    return _control;
};
