import { DCTemplateConfig } from 'factory/viewmodel/viewmodel-interfaces';

export const decisionConceptTemplatesUI: DCTemplateConfig[] = [
    {
        templateName: 'Diagnosis_Or_Indication', 
        'pa_01_ws_Diagnosis_Or_Indication_m1' : {
            'diagnosis_or_indication_type' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Diagnosis',
                joinSep : '',
                placeholderText: 'Select Diagnosis',
            }
        }
    },
    {
        templateName: 'Currently_On_Therapy_For_Diagnosis',
        'pa_01_ws_Currently_On_Therapy_For_Diagnosis_m2' : {
            'therapy_agent' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Therapy Agent',
                joinSep : '',
                placeholderText: 'Select Therapy',
            },
            'diagnosis_or_indication_category' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Diagnosis or Indication',
                joinSep : '',
                placeholderText: 'Select Diagnosis',
            }
        }
    },
    {
        templateName: 'Age_Requirement',
        type : 'standard',
        prefixText: "Age", 
        'pa_01_ws_Age_Requirement_m1' : {
            'min_age' : {
                configPointType : '',
                componentType : '',
            },
            'max_age' : {
                configPointType : 'threshold',
                componentType : 'threshold',
                label: 'Age',
                minDomainProperty : 'min_age',
                maxDomainProperty : 'max_age',
                min : 0,
                max : 9999,
                unit : 'years',
                operators : ['<', '>=']
            }
        }
    },
    {
        templateName: 'Requested_Drug',
        'pa_01_ws_Requested_Drug_m1' : {
            'requested_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label: 'Requested Drug',
                joinSep : '',
                exclusive : true, //show alone when viewing
                placeholderText: 'Select Drug'
            },
            'is_other' : {
                configPointType : 'select', //NOTE: because we don't want it visualized on its own
                componentType : 'autocomplete',
                exclusive : true, //show alone when viewing
                canConfigure : false, //hide in configuration mode
                label: 'Requested Drug',
                selectList : [
                    {
                        id : '1',
                        label : 'All Others'
                    }
                ]
            }
        }
    },
    {
        templateName : 'Provider_Specialty',
        'pa_01_ws_Provider_Specialty_m3' : {
            'provider_specialty_type' : {
                configPointType : 'select',
                multi : true,
                componentType : 'autocomplete',
                label: 'Provider Specialty',
                joinSep : ' OR ',
                placeholderText: 'Select Provider'
            }
        }
    },
    {
        templateName: 'Previous_Diagnostic_Procedure',
        'pa_01_ws_Previous_Diagnostic_Procedure_m1' : {
            'diagnostic_procedure' : {
                configPointType : 'select',
                multi : false,
                group : true,
                componentType : 'autocomplete',
                label : 'Procedure',
                joinSep : '',
                placeholderText: 'Select Procedure',
             }
        }
    },
    {
        templateName: 'Combination_Therapy_With_Requested_Drug',
        'pa_01_ws_Combination_Therapy_With_Requested_Drug_m1' : {
            'combination_therapy_with_requested_drug_requested_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Requested Drug',
                joinSep : '',
                placeholderText: 'Select Drug'
             },
            'combination_therapy_with_requested_drug_secondary_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Combined With',
                joinSep : '',
                placeholderText: 'Select Drug',
             }
        }
    },
    {
        templateName: 'Patient_Has_Symptom',
        'pa_01_ws_Patient_Has_Symptom_m1' : {
            'condition' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Condition',
                joinSep : '',
                placeholderText: 'Select Symptom'
             },
        }
    },
    {
        templateName: 'Patient_Tried_Generic',
        type : 'standard',        
        prefixText: "Tried Generic",
        'pa_01_ws_Patient_Tried_Generic_m1' : {
            'generic_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Generic',
                joinSep : '',
                placeholderText: 'Select Generic'
             }
        }
    },
    {
        templateName: 'Requested_Drug_Dosage_Incompatible_With_Generic',
        'pa_01_ws_Requested_Drug_Dosage_Incompatible_With_Generic_m1' : {
            'dosage_incompatible_with_generic_requested_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Requested Drug',
                joinSep : '',
                placeholderText: 'Select Drug'
             },
            'dosage_incompatible_with_generic_generic_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Generic',
                joinSep : '',
                placeholderText: 'Select Generic',
             },
            'dosage_incompatible_with_generic_divisor' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Dose',
                joinSep : '',
                placeholderText: 'Select Dosage',
             }
        }
    },
    {
        templateName: 'On_Requested_Drug_For_Duration',
        'pa_01_ws_On_Requested_Drug_For_Duration_m1' : {
            'requested_drugname' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Requested Drug',
                joinSep : '',
                placeholderText: 'Select Drug'
             },
            'days_duration' : {
                configPointType : 'text',
                componentType : 'textfield',
                label : 'On therapy for at least (in days):',
                unit : 'days',
             }
        }
    },
    {
        templateName: 'Patient_Tried_Therapy_For_Diagnosis',
        'pa_01_ws_Patient_Tried_Therapy_For_Diagnosis_m1' : {
            'therapy_agent' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Therapy Agent',
                joinSep : '',
                placeholderText: 'Select Agent'
             },
            'diagnosis_or_indication_category' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Diagnosis',
                joinSep : '',
                placeholderText: 'Select Diagnosis'
             }
        }
    },
    {
        templateName: 'Provider_Specialty_Diagnosis_Confirmed',
        'pa_01_ws_Provider_Specialty_Diagnosis_Confirmed_m1' : {
            'provider_specialty_type' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Provider Specialty',
                joinSep : '',
                placeholderText: 'Select Provider'
             },
            'diagnosis_or_indication' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Diagnosis',
                joinSep : '',
                placeholderText: 'Select Diagnosis'
             }
        }
    },
    {
        templateName: 'Currently_On_Therapy',
        'pa_01_ws_Currently_On_Therapy_m1' : {
            'therapy_agent' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Currently On Therapy',
                joinSep : '',
                placeholderText: 'Select Therapy'
             }
        }
    },
    {
        templateName: 'Patient_Risk_Factor_Meets_Threshold',
        'pa_01_ws_Patient_Risk_Factor_Meets_Threshold_m1' : {
            'risk_factor' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Risk Factor',
                joinSep : '',
                placeholderText: 'Select Risk Factor',
                
             },
            'risk_threshold' : {
                configPointType : 'select',
                multi : false,
                componentType : 'autocomplete',
                label : 'Risk Threshold',
                joinSep : '',
                placeholderText: 'Select Risk Threshold'
             }
        }
    }
];
                                       
