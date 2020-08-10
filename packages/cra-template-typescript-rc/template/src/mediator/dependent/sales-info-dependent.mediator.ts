import store from "core/managers/state-manager";
import { EventKeys } from "presentation/events";

const mediateSalesInfoDependentMediator = (setSalesInfo) => {
    return ((setter) => {
        setter(store.getState().salesInfo);
        return store.subscribe(() => {
            const { salesInfo, currentAction } = store.getState();
            if (currentAction.type === EventKeys.UPDATE_SALES_INFO) {
                setter(salesInfo);
            }
        });
    })(setSalesInfo);
};

export default mediateSalesInfoDependentMediator;
