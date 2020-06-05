import { propEq, entries, keys } from 'core/utils/object-utils'
import { STATUS } from 'guideline/guideline.constants'
import { createSequenceStepBranches } from 'common/utils/dc-utils';
import { isValidInteger } from 'core/utils/validation-utils';
import { groupBy, sort } from 'core/utils/list-utils';
import { IStep, GuidelineDCViewModel } from 'factory/viewmodel/viewmodel-interfaces.d';

const checkGuidelineStatus = (status) => {
  return propEq('status', status)
};

export const sortGuidelinesByStatus = (guidelines, status) => {
  const check = (guideline) => {
    return checkGuidelineStatus(status)(guideline) ? -1 : 1
  }
  return sort(check, guidelines);
};

export const isGuidelinePublished = (guideline) => {
  return checkGuidelineStatus(STATUS.PUBLISHED)(guideline)
};

export const isGuidelineInProgress = (guideline) => {
  return checkGuidelineStatus(STATUS.IN_PROGRESS)(guideline)
};

export const validateSequence = (totalSteps, sequence) => {
    let groupedSequence = groupBy((seqItem) => seqItem.step, sequence);
    let validation:any = {
        isValid : false,
        warnings : [],
        errors : []
    };

    //branching adds to sequence array length though it counts as 1 step
    let sequenceLength = keys(groupedSequence).length;
    if(sequenceLength >= totalSteps) {
        for(let [step, stepItems] of entries(groupedSequence)) {
            let branches = createSequenceStepBranches(stepItems);
            let gotos = branches.filter((branch) => isValidInteger(branch.action));
            let errors = gotos.reduce((agg, item) => {
                return [ 
                    ...agg,
                    ...(!!groupedSequence[item.action] ? [] : [{ step, goto : item.action }])
                ];
            }, []);
            let updatedErrors = [ ...validation.errors, ...errors ];
            validation = {
                ...validation,
                isValid : !updatedErrors.length,
                errors :  updatedErrors,
            }
        }
    } else {
        validation.warnings = ['You must complete all the steps to generate paths'];
    }  

    return validation;
};

export const getNextEmptyStep = (current: number, sequence: Array<any>, total: number): IStep => {
  let nextStepNo = null;
  for(let i = current + 1; i <= total; i ++) {
      const s = sequence.find(_s => _s.step === i);
      if (s === undefined) {
          nextStepNo = i;
          break;
      }
  }
  return {
    completed : false,
    stepName : '',
    stepNo : nextStepNo
  }
}

export const findInSequence = (step, dcID, sequence) => {
    return sequence.find((sdc) => sdc.id === dcID && sdc.step === step);
};

export const isInSequence = (step, dcID, sequence) => {
    return !!findInSequence(step, dcID, sequence);
};
