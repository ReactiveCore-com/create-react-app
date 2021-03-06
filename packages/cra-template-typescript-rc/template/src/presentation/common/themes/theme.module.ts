import { createMuiTheme } from "@material-ui/core";
import "presentation/common/themes/themes.d";

export const Rounded = (theme) => {
    createMuiTheme({
        ...theme,
        shape: {
            borderRadius: 10,
        },
    });
};

export const RCTheme = createMuiTheme({
    typography: {
        h1: {
            lineHeight: "30px",
            color: "#333",
            fontSize: "30px",
            fontWeight: 400,
            textTransform: "uppercase",
        },
        h2: {
            fontSize: "20px",
            color: "#333",
        },
        h3: {
            lineHeight: "25px",
            fontSize: "18px",
            color: "#666666",
        },
        h6: {
            color: "#333",
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "uppercase",
        },
        subtitle1: {
            color: "#333333",
            letterSpacing: "0px",
            fontSize: "20px",
            fontWeight: 200,
        },
        subtitle2: {
            color: "#333",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "50px",
        },
        body1: {
            color: "#333",
            fontWeight: 400,
            fontSize: "14px",
        },
        body2: {
            color: "#333",
            fontWeight: 300,
            fontSize: "14px",
        },
    },
    props: {
        MuiInput: {
            disableUnderline: true,
        },
    },
    overrides: {
        // MuiToggleButtonGroup: {
        //     grouped: {
        //         minWidth: "50px",
        //     },
        //     root: {
        //         borderRadius: 5,
        //     },
        // },
        MuiFormControlLabel: {
            label: {
                lineHeight: "25px",
                fontSize: "18px",
                color: "#666666",
            },
            labelPlacementStart: {
                marginLeft: "0",
                marginRight: "0",
            },
        },
        MuiBreadcrumbs: {
            root: {
                lineHeight: "25px",
                fontSize: "18px",
                color: "#666666",
            },
        },
        MuiTextField: {
            root: {
                "&.DCTextField": {
                    "& input": {
                        border: "1px solid #cccccc",
                        borderRadius: 5,
                        fontSize: "14px",
                        color: "#333",
                        padding: "0px 10px",
                        flexWrap: "wrap",
                        lineHeight: "48px",
                        alignItems: "center",
                        height: "auto",
                        backgroundColor: "#FFF",
                        "&:focus": {
                            borderRadius: 5,
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                "& $notchedOutline": {
                    border: "none!important",
                },
            },
        },
        MuiTypography: {
            paragraph: {
                marginBottom: "30px",
            },
            // hack because can't extend TypographyProps
            h6: {
                "&.form-label": {
                    paddingBottom: "15px",
                },
            },
        },
        MuiSelect: {
            select: {
                border: "1px solid #808080",
                borderRadius: 5,
                fontSize: "14px",
                color: "#333",
                padding: "0px 10px",
                flexWrap: "wrap",
                lineHeight: "48px",
                alignItems: "center",
                height: "auto",
                backgroundColor: "#FFF",
                "&:focus": {
                    borderRadius: 5,
                },
            },
        },
        // still in material-ui lab, overrides tricky
        // MuiAutocomplete: {
        //     inputRoot: {
        //         border: "1px solid #cccccc",
        //         borderRadius: 5,
        //         fontSize: "14px",
        //         color: "#333",
        //         padding: "0px 10px",
        //         flexWrap: "wrap",
        //         alignItems: "center",
        //         height: "auto",
        //         backgroundColor: "#FFF",
        //     },
        //     input: {
        //         height: "48px",
        //         padding: "0px 10px !important",
        //     },
        // },
        MuiButton: {
            root: {
                minHeight: 50,
                borderRadius: 25,
                "&:hover": {
                    color: "#FFF",
                    backgroundColor: "#808080",
                },
            },
            label: {
                fontSize: "14px",
            },
            outlined: {
                border: "1px solid #808080",
                padding: "5px 30px",
                color: "#808080",
                backgroundColor: "#FFF",
                "&.Mui-disabled": {
                    border: "1px solid #CCC",
                    color: "#CCC",
                    backgroundColor: "#F7F7F7",
                },
            },
            outlinedSizeSmall: {
                padding: "5px 30px",
            },
            startIcon: {
                marginRight: "20px",
            },
            sizeSmall: {
                minHeight: 40,
                borderRadius: 20,
            },
        },
        MuiInput: {
            input: {
                "&::placeholder": {
                    color: "black",
                },
            },
        },
    },
});

export const searchBarTheme = (theme) => {
    return createMuiTheme({
        ...theme,
        typography: {
            ...theme.typography,
            subtitle1: {
                ...theme.typography.subtitle1,
                fontSize: "16px",
                lineHeight: "40px",
            },
        },
        overrides: {
            ...theme.overrides,
            MuiAutocomplete: {
                ...theme.overrides.MuiAutocomplete,
                input: {
                    ...theme.overrides.MuiAutocomplete.input,
                    height: "58px",
                },
                inputRoot: {
                    border: "None",
                },
            },
            MuiSelect: {
                ...theme.overrides.MuiSelect,
                select: {
                    ...theme.overrides.MuiSelect.select,
                    lineHeight: "58px",
                },
            },
        },
    });
};

export const createGuidelineFormTheme = (theme) => {
    return createMuiTheme({
        ...theme,
        props: {
            ...theme.props,
            MuiInput: {
                disableUnderline: false,
            },
        },
    });
};
