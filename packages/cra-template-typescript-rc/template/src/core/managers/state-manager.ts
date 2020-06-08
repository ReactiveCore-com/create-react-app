import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { updateState } from 'core/utils/state-utils';

const defaultStateFactory = (state, action) => {
    return state;
};

const combinedReducer = combineReducers({
        //tempDecisionConcepts: updateState(tempDCActionMap),
    });

const rootReducer = (state, action) => {
    let intermediateState = combinedReducer(state, action);
    return defaultStateFactory(intermediateState, action);
};

export const store = createStore(
    //NOTE: concept of root reducer from https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers
    rootReducer,
    applyMiddleware(logger, thunk)
);
