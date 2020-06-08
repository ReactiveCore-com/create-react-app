//https://material-ui-pickers.dev/guides/css-overrides#typescript
import { Overrides  } from '@material-ui/core/styles/overrides';
import * as createPalette from '@material-ui/core/styles/createPalette';

type overridesNameToClassKey = {
    MuiAutocomplete: any;
    MuiToggleButtonGroup
};

type overridesPalette = {
    drug : any;
    patient : any;
};

type colorPalette = {
      color?:
        | 'initial'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'textPrimary'
        | 'textSecondary'
        | 'drug'
        | 'patient'
        | 'error';
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

declare module '@material-ui/core/styles/createPalette' {
  export interface PaletteOptions extends overridesPalette { }
  export interface Palette extends overridesPalette { }
}

//not working
//declare module '@material-ui/core/Typography' {
//    interface typographyProps  {
//          color?:
//            | 'initial'
//            | 'inherit'
//            | 'primary'
//            | 'secondary'
//            | 'textPrimary'
//            | 'textSecondary'
//            | 'drug'
//            | 'patient'
//            | 'error';
//    }
//}
