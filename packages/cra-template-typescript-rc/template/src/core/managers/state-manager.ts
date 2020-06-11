import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { updateState } from 'core/utils/state-utils';
import { salesInfoActionMap } from 'mediator/requester/action-map';

const someGlobalStateFactory = (state, action) => {
    return state;
};

const combinedReducer = combineReducers({
    salesInfo: updateState(salesInfoActionMap),
    currentAction : (state, action) => action
});

const rootReducer = (state, action) => {
    let intermediateState = combinedReducer(state, action);
    return someGlobalStateFactory(intermediateState, action);
};

export const store = createStore(
    //NOTE: concept of root reducer from https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers
    rootReducer,
    applyMiddleware(logger, thunk)
);
