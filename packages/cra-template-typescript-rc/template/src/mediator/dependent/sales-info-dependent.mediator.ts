import { store } from 'core/managers/state-manager';

export const mediateSalesInfoDependentMediator = (setSalesInfo) => {
    return ((setter) => {
        setter(store.getState().salesInfo);
        return store.subscribe(() => {
            let { salesInfo, currentAction} = store.getState();
            if(currentAction.type === 'updateSalesInfo') {
                setter(salesInfo);
            }
        });
    })(setSalesInfo);
};
