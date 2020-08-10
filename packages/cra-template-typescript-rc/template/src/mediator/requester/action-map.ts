import * as SalesInfoStateFactory from "factory/state/sales-info-state.factory";
import { EventKeys } from "presentation/events";

const salesInfoActionMap = {
    [EventKeys.UPDATE_SALES_INFO]: SalesInfoStateFactory.createSalesInfoState,
    default: SalesInfoStateFactory.createDefaultState,
};

export default salesInfoActionMap;
