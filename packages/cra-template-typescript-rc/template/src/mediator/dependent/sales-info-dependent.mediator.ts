import store from 'core/managers/state-manager';
import { EVENT_KEYS } from 'presentation/events';

const mediateSalesInfoDependentMediator = (setSalesInfo) => {
    return ((setter) => {
        setter(store.getState().salesInfo);
        return store.subscribe(() => {
            const { salesInfo, currentAction } = store.getState();
            if (currentAction.type === EVENT_KEYS.UPDATE_SALES_INFO) {
                setter(salesInfo);
            }
        });
    })(setSalesInfo);
};

export default mediateSalesInfoDependentMediator;
