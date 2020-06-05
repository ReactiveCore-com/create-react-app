import { store } from 'core/managers/state-manager';
import { isEmpty, isNil, prop, has } from 'core/utils/object-utils';
import { groupBy, map, flatten, find } from 'core/utils/list-utils';
import { pipe, head } from 'core/utils/func-utils';
import { decisionConceptTemplateUIConfigs } from 'factory/viewmodel/decision-concept.factory';
import { DECISION_ANSWER, DCConfigurationType } from 'common/dc-constants';
import { IStep } from 'factory/viewmodel/viewmodel-interfaces';


//TODO: evaluate if store slices should be passed as args or pull from store directly

//TODO: Probably won't need this anymore
export const isSavedDecisionConcept = (id) => {
    return !!store.getState().savedDecisionConcepts.find((sdc) => sdc.id === id);
};

export const getTemplateByName = (templateName) => {
    return getDCTemplates().find((dc) => dc.name === templateName)
};

export const getDCTemplates = () => {
    return store.getState().dcTemplates || [];
};

export const getAllDecisionConcepts = (templates) => {
    //const savedDCs = store.getState().savedDecisionConcepts;
    //return templates.concat(savedDCs.filter((sdc) => !sdc.isParent));
    return templates;
    //return getDCTemplates().concat(store.getState().savedDecisionConcepts.filter((sdc) => !sdc.isParent));
};

export const getVisibleTemplateConfigs = (templateName) => {
    let { configSets } = decisionConceptTemplateUIConfigs.find((dctUI) => dctUI.templateName === templateName);
    let configSet = configSets.find((cs) => cs.visible);
    return configSet.configuration.filter((conf) => !!conf.view);
};

export const sortByTemplateConfig = (templateName, configValues) => {
    let visibleConfigs = getVisibleTemplateConfigs(templateName)
    let configViews = []
    visibleConfigs.forEach((conf) => {
        let configVal = configValues.find((cv) => cv.domain_property === conf.domainProperty)
        if (configVal) {
            configViews.push({...configVal})
        }
    })
    return configViews
};

//TODO move to dc factory
export const createDCNameViewModel = (templateName, configValues) => {
    let visibleConfigs = getVisibleTemplateConfigs(templateName)
    let sortedConfigValues = sortByTemplateConfig(templateName, configValues);
    let listOfConfigs = []
    //TODO: iterate through sortedConfigValues will remove the need to call .find()
    visibleConfigs.forEach((cv) => {
        let conf = sortedConfigValues.find((conf) => conf.domain_property === cv.domainProperty)
        if (!!conf) {
            if (conf.domain_property === 'is_other') { return }
            listOfConfigs.push({ values : conf, templateView: cv.view });
        }
    });
    return listOfConfigs;
};

export const isStepUsed = (step: IStep): boolean => {
    return store.getState().sequence.find((sdc) => sdc.step === step.stepNo) !== undefined;
};

export const getDecisionConceptsByCategory = (category, decisionConcepts) => {
    return decisionConcepts.filter((dc) => category === 'all' ? true : category === dc.category.name);
};

export const getSavedDecisionConceptsForTemplate = (id, savedDecisionConcepts) => {
    return savedDecisionConcepts.filter((sdc) => sdc.templateID === id);
};

export const tempValuesMatchConfigPoints = (template, tempValues) => {
    let returnDisabled = true;

    const nbConfig = template.configuration.filter((conf) => !conf.asConcept).length || -1;
    const configName = template.name;

    if (nbConfig >= 0) {
        const nbConfigValues = tempValues[configName] && tempValues[configName].configurationValues ?
                               tempValues[configName].configurationValues.length : -1;

        if (nbConfigValues === nbConfig) {
            let index;
            returnDisabled = false;
            for (index = 0; index < nbConfigValues; index++) {
                const curValues = tempValues[configName].configurationValues[index].values;
                if (isNil(curValues) || isEmpty(curValues)) {
                    returnDisabled = true;
                } else if (isNil(curValues[0]) || isEmpty(curValues[0])) {
                    returnDisabled = true;
                }
            }
        }
    }

    return returnDisabled;
};

export const createSequenceStepBranches = (conceptsForStep) => {
    return pipe(
        map((concept) => {
            //NOTE: for now we only support branching with YES paths
            //so there is no need to collect branches for NO paths in that case
            return (concept.type === DCConfigurationType.BRANCHING ? [DECISION_ANSWER.YES] : [DECISION_ANSWER.YES, DECISION_ANSWER.NO]).map((yesno) => {
                return {
                    id : concept.dc_id,
                    answer : yesno,
                    action : concept[yesno].action,
                    code : concept[yesno].code,
                }
            });
        }),
        flatten
    )(conceptsForStep);
};

export const sortDecisionConcepts = (options) => {
    return options.sort((val) => isSavedDecisionConcept(val.id) ? 1 : -1)
};

export const sortDCValues = (dcValues) => {
    let sorted = dcValues.map((config) => {
        config.values = config.values.sort()
        return config
    })
    return sorted
};

// TODO refactor with Ramda functions
export const getMaxValue = (values) => {
    let maxDomainProperty = values[1].templateView.maxDomainProperty
    const findMaxDomainProperty = (vals) => vals.find(val => val.values.domain_property === maxDomainProperty)
    const maxValue = x => x.values.values[0]
    
    let domainProp = findMaxDomainProperty(values)

    return maxValue(domainProp)
}

// TODO refactor with Ramda functions
export const getMinValue = (values) => {
    let minDomainProperty = values[1].templateView.minDomainProperty
    const findMinDomainProperty = (vals) => vals.find(val => val.values.domain_property === minDomainProperty)
    const minValue = x => x.values.values[0]
    
    let domainProp = findMinDomainProperty(values)

    return minValue(domainProp)
}
