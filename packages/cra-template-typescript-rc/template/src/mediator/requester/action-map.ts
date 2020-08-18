import * as SalesInfoStateFactory from 'factory/state/sales-info-state.factory';
import { EVENT_KEYS } from 'presentation/events';

const salesInfoActionMap = {
    [EVENT_KEYS.UPDATE_SALES_INFO]: SalesInfoStateFactory.createSalesInfoState,
    default: SalesInfoStateFactory.createDefaultState,
};

export default salesInfoActionMap;
