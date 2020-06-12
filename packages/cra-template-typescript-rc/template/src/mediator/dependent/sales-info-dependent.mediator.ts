import { store } from 'core/managers/state-manager';
import { EVENT_KEYS } from 'presentation/events';

export const mediateSalesInfoDependentMediator = (setSalesInfo) => {
    return ((setter) => {
        setter(store.getState().salesInfo);
        return store.subscribe(() => {
            let { salesInfo, currentAction} = store.getState();
            if(currentAction.type === EVENT_KEYS.UPDATE_SALES_INFO) {
                setter(salesInfo);
            }
        });
    })(setSalesInfo);
};
