const updateState = (actionsMap) => (state, action) => {
    const factory: Function = actionsMap[action.type] || actionsMap.default;
    return factory(state, action);
};

export default updateState;
