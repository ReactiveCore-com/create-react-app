import React from "react";
import AutocompleteControl from "./autocomplete.component";
import ThresholdControl from "./threshold.component";
import { TextControl, SelectControl, RangeControl, ToggleControl } from "./form.components";

const formComponentsProvider = (disabled, configuration, values) => {
    let curcontrol;

    switch (configuration.type) {
        case "dropdown":
            curcontrol = (
                <SelectControl
                    key={configuration.id}
                    selectedItems={configuration.attrs.selected}
                    disabled={disabled}
                    values={values}
                    {...configuration.attrs}
                />
            );
            break;
        case "range":
            curcontrol = (
                <RangeControl disabled={disabled} key={configuration.id} values={values} {...configuration.attrs} />
            );
            break;
        case "textfield":
            curcontrol = (
                <TextControl key={configuration.id} disabled={disabled} values={values} {...configuration.attrs} />
            );
            break;
        case "autocomplete":
            curcontrol = (
                <AutocompleteControl
                    key={configuration.id}
                    disabled={disabled}
                    values={values}
                    {...configuration.attrs}
                />
            );
            break;
        case "threshold":
            curcontrol = (
                <ThresholdControl disabled={disabled} key={configuration.id} values={values} {...configuration.attrs} />
            );
            break;
        case "toggle":
            curcontrol = <ToggleControl disabled={disabled} key={configuration.id} {...configuration.attrs} />;
            break;
        default:
            console.log(configuration);
    }
    return curcontrol;
};

export default formComponentsProvider;
