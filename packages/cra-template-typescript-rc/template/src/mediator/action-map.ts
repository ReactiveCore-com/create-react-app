import * as SalesInfoStateFactory from "factory/state/sales-info-state.factory";

const salesInfoActionMap = {
    updateSalesInfo: SalesInfoStateFactory.createSalesInfoState,
    default: SalesInfoStateFactory.createDefaultState,
};

export default salesInfoActionMap;
