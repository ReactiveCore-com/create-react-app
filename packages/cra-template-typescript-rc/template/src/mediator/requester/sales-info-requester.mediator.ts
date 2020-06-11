import { store } from 'core/managers/state-manager';
import { getData } from 'core/services/example.service';

export const mediateRequestSalesInfo = (requestSalesInfoSignal) => {
    return ((requestSignal) => {
        const handleSignal = async (payload) => {
            let data = await getData();
            store.dispatch({
                type : 'updateSalesInfo',
                payload : data
            });
        };

        requestSignal.add(handleSignal);

        return {
            destroy() {
                requestSignal.remove(handleSignal)
            }
        };
    })(requestSalesInfoSignal);
};
