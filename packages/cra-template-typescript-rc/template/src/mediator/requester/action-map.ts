import * as SalesInfoStateFactory from 'factory/state/sales-info-state.factory';
import { EVENT_KEYS } from 'presentation/events';

export const salesInfoActionMap = {
    [EVENT_KEYS.UPDATE_SALES_INFO] : SalesInfoStateFactory.createSalesInfoState,
    default : SalesInfoStateFactory.createDefaultState
};
