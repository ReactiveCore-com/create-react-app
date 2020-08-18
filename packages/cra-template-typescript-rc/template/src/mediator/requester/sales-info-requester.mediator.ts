import store from 'core/managers/state-manager';
import getData from 'core/services/example.service';
import { EVENT_KEYS } from 'presentation/events';

const mediateRequestSalesInfo = (requestSalesInfoSignal) => {
    return ((requestSignal) => {
        const handleSignal = async () => {
            const data = await getData();
            store.dispatch({
                type: EVENT_KEYS.UPDATE_SALES_INFO,
                payload: data,
            });
        };

        requestSignal.add(handleSignal);

        return {
            destroy() {
                requestSignal.remove(handleSignal);
            },
        };
    })(requestSalesInfoSignal);
};

export default mediateRequestSalesInfo;
