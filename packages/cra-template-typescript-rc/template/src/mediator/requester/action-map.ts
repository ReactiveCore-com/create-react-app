import * as SalesInfoStateFactory from 'factory/state/sales-info-state.factory';

export const salesInfoActionMap = {
    updateSalesInfo : SalesInfoStateFactory.createSalesInfoState,
    default : SalesInfoStateFactory.createDefaultState
};
