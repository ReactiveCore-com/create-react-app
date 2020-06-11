export const createDefaultState = (state = null, action) => {
     return state; 
};

export const createSalesInfoState = (state, action) => {
    return action.payload;
};
