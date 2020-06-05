import React, { useEffect, useState } from 'react';
import { store } from 'core/managers/state-manager';
import { Typography } from '@material-ui/core';
import { formComponentsProvider } from '../forms/form.components.provider';
import { categoryProvider } from '../../themes/category.provider';
import { isSavedDecisionConcept } from 'common/utils/dc-utils'
import { keys } from 'core/utils/object-utils';
import { pipe } from 'core/utils/func-utils';
import { find } from 'core/utils/list-utils';

export const DecisionConceptFormComponent = props => {
    const { dc, disabled } = props;
    const category = categoryProvider(dc.category.name);
    const [ tempConcepts, setTempConcepts ] = useState(store.getState().tempDecisionConcepts);
    const displayName = isSavedDecisionConcept(dc.id) ? dc.displayName : (tempConcepts[dc.name] && tempConcepts[dc.name].displayName) || "";

    useEffect(() => {
        let unsubsribe = store.subscribe(() => {
            setTempConcepts(store.getState().tempDecisionConcepts)
        });

        return () => {
            unsubsribe();
        };
    });
    
    let formComponents = ((configuration) => {
        return configuration.map((conf:any) => {
            let comp = formComponentsProvider(disabled, conf, dc.values ? dc.values[conf.id] : null)
            if(isSavedDecisionConcept(dc.id)) {
                if(conf.exclusive) {
                    let activeDomainProp = pipe(
                        keys,
                        find((key) => dc.values[key].length)
                    )(dc.values);
                    if(activeDomainProp !== conf.id) {
                        comp = '';
                    }
                }
            } else {
                if(conf.canConfigure === false) {
                    comp = '';
                }
            }
            return comp;
        });
    })(dc.configuration);

    return (
        <>
        {formComponents}
        {
            !!displayName && 
            <>
            <Typography variant="h6">Concept Name</Typography>
            <Typography variant="subtitle2" className={category.name.toLowerCase()}>
                { displayName }
            </Typography>
            </>
        }
        </>
    )
}
