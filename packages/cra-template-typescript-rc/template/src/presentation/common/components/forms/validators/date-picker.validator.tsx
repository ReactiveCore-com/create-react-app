import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ValidatorComponent } from "react-material-ui-form-validator";

export default class DatePickerValidator extends ValidatorComponent {
    [x: string]: any;
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      onChange,
      ...rest
    } = this.props;
    return (
      <KeyboardDatePicker
        onChange={onChange}
        {...rest}
        error={!this.isValid()}
        helperText={(!this.isValid() && this.getErrorMessage()) || helperText}
      />
    );
  }
}
