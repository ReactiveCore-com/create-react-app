export const updateState = (actionsMap) => (state, action) => {
    let factory:Function = actionsMap[action.type] || actionsMap.default;
    return factory(state, action);
};

