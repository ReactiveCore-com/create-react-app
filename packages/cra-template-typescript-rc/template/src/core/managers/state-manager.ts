import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { treeModelFactory } from 'factory/state/treemodel-state.factory';
import { sequenceFactory } from 'factory/state/sequence-state.factory';
import { selectedTemplateFactory } from 'factory/state/selected-template-state.factory';
import { selectedSavedDCFactory } from 'factory/state/selected-saveddc-state.factory';
import { updateState } from 'core/utils/state-utils';
import { tempDCActionMap } from 'mediators/update-temp-dc-requester.mediator';
import { DCConfigurationType } from 'common/dc-constants';

const initialState =  {
    guidelineEditor: {
        tempDecisionConcepts: {},
        search: [],
        searchCategory: 'all',
        searchType: 'category',
        tempOptions: {},
        configuredStep: null,
        selectedTemplate: null,
        selectedSavedDC: null,
        activeStep: null,
        layout: {DecisionConceptConfigurationComponent : { view : DCConfigurationType.STANDARD }}
    },
    pathwayVisualiser: {
        configuredStep: null,
        selectedTemplate: null,
        selectedSavedDC: null,
        dcDetails:  null,
        layout: {DecisionConceptConfigurationComponent : { view : DCConfigurationType.STANDARD }}
    },
    treeVisualizer: {
        configuredStep: null,
        selectedTemplate: null,
        selectedSavedDC: null,
        treeModel:  [],
        layout: {DecisionConceptConfigurationComponent : { view : DCConfigurationType.STANDARD }}
    }
};


const savedDecisionConceptFactory = (state = [], action: any) => {
    switch (action.type) {
        case 'updateSavedDecisionConcepts':
            return action.payload;
        default:
            return [...state];
    }
};

const searchFactory = (state = [], action) => {
    switch (action.type) {
        case 'updateSearchResults':
            return [...action.payload];
        default:
            return [...state];
    }
};

const searchCatFactory = (state = 'all', action) => {
    switch (action.type) {
        case 'updateSearchCategory':
            return action.payload;
        default:
            return state;
    }
};

const configuredStepFactory = (state = null, action) => {
    switch (action.type) {
        case 'setConfiguredStep':
            return action.payload;
        default:
            return state;
    }
};

const searchTypeFactory = (state = 'category', action) => {
    switch (action.type) {
        case 'updateSearchType':
            return action.payload;
        default:
            return state;
    }
};

const tempOptionsFactory = (state = {}, action) => {
    switch (action.type) {
        case 'updateTempOptions':
            return {
                ...state,
                [action.payload.id] : action.payload.options
            };
        case 'clearTempOptions':
            return { };
        default:
            return state;
    }
};

const DCTemplatesFactory = (state = [], action) => {
    switch (action.type) {
        case 'setDCTemplates':
            return action.payload;
        default:
            return state;
    }
};

const guideLineFactory = (state = {}, action) => {
    switch (action.type) {
        case 'setActiveGuideline':
            return action.payload;
        default:
            return state;
    }
};

const dcDetailsFactory = (state, action) => {
    switch (action.type) {
        case 'setDCDetails':
            let sequenceItem = state.sequence.find((seqItem) => seqItem.dc_id === action.payload.dc_id);
            return {
                ...state,
                dcDetails : { ...sequenceItem }
            }
        case 'clearDCDetails': 
            return {
                ...state,
                dcDetails: null
            };
        default:
            return {
                ...state,
                dcDetails : state.dcDetails || null
            };        
    }
};

const actionFactory = (state, action) => {
    return action;
};

const stepFactory = (state = null, action) => {
    switch (action.type) {
        case 'setActiveStep':
            return action.payload;
        default:
            return state;        
    }
};

const layoutFactory = (state = { DecisionConceptConfigurationComponent : { view : DCConfigurationType.STANDARD } }, action) => {
    switch (action.type) {
        case 'updateLayout':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return { ...state };
    }
};

const defaultStateFactory = (state, action) => {
    switch (action.type) {
        case 'RESET_STATE':
            return {
                ...state,
                ...initialState[action.payload]
            };
        default:
            return state;
    }
};

const combinedReducer = combineReducers({
        tempDecisionConcepts: updateState(tempDCActionMap),
        savedDecisionConcepts: savedDecisionConceptFactory,
        sequence: sequenceFactory,
        search: searchFactory,
        searchCategory: searchCatFactory,
        searchType: searchTypeFactory,
        tempOptions: tempOptionsFactory,
        configuredStep: configuredStepFactory,
        dcTemplates: DCTemplatesFactory,
        //placeholder key or redux shows error
        dcDetails : (state, action) => state || null,
        guideline: guideLineFactory,
        selectedTemplate: selectedTemplateFactory,
        selectedSavedDC: selectedSavedDCFactory,
        treeModel: treeModelFactory,
        currentAction: actionFactory,
        activeStep: stepFactory,
        layout: layoutFactory,
    });

const rootReducer = (state, action) => {
    let intermediateState = combinedReducer(state, action);
    //NOTE: for state factories that need whole state;
    let finalState = dcDetailsFactory({
        ...state, 
        ...intermediateState
    }, action);

    return defaultStateFactory(finalState, action);
};

export const store = createStore(
    //NOTE: concept of root reducer from https://redux.js.org/recipes/structuring-reducers/beyond-combinereducers
    rootReducer,
    applyMiddleware(logger, thunk)
);
