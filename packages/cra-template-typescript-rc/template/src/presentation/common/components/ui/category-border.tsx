import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { categories } from 'common/themes/categories';

const createCategoryStyles = (categories, overrides) => {
    
    let styles = categories.reduce((agg, item) => {
            return {
                ...agg,
                [item.className] : {
                    width : '2px',
                    borderStyle : 'solid',
                    height : '60px',
                    borderWidth : '1px',
                    borderRadius : '2px',
                    background : item.color,
                    borderColor : item.color,
                    ...overrides
                }
            }
    }, {});
    return styles;
};



export const DCBorder = (props) => {
    let { overrides } = props
    const useStyles = makeStyles((theme) => 
    createStyles({
        ...createCategoryStyles(categories, overrides)
        })
    );
    
    let classes = useStyles({});

    return (
        <div className={classes[props.category.className]} />
    );
    
}
