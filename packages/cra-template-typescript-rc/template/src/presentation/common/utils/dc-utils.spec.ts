import { store } from 'core/managers/state-manager';
import * as DCUtils from './dc-utils';

describe('decision concept utils tests', () => {
    describe('getVisibleTemplateConfigs', () => {
        test('should should return all visible template configurations', () => {
            let templateName = "Requested_Drug";
            let visibleConfigs = DCUtils.getVisibleTemplateConfigs(templateName);
            let actualVisibleConfigs = [
                {
                    lookupURI: "common/PATIENT_REQUESTED_DRUG_lookup",
                    lookupKeyCol: "DRUGNAME",
                    hiddenFields: [],
                    domainProperty: "requested_drugname",
                    view: {
                        configPointType: "select",
                        multi: false,
                        componentType: "autocomplete",
                        exclusive : true,
                        label: "Requested Drug",
                        joinSep: "",
                        placeholderText: "Select Drug",
                    },
                },
                {
                    asConcept : true,
                    dcNamePrefix: "All_Others_Requested_Drug",
                    domainProperty: "is_other",
                    selectedValues : ['1'],
                    view : {
                        configPointType : 'select',
                        componentType : 'autocomplete',
                        exclusive : true,
                        canConfigure : false,
                        label: 'Requested Drug',
                        selectList : [
                            {
                                id : '1',
                                label : 'All Others'
                            }
                        ]
                    },
                },
            ];

            expect(visibleConfigs).toEqual(actualVisibleConfigs);
        });
    });

    describe('sortByTemplateConfig', () => {
        test('should should return all domain properties specified by the UI config', () => {
            let templateName = "Provider_Specialty_Diagnosis_Confirmed";
            let values = [
                {
                    domain_property: "prescriber_specialty_info",
                    values: ["common/PRESCRIBER_SPECIALTY_lookup"],
                },
                {
                    domain_property: "provider_specialty_type",
                    values: ["PSYCHIATRIST"],
                },
                {
                    domain_property: "diagnosis_or_indication",
                    values: ["Pervasive Developmental Disorder"],
                },
            ];
            let sorted = DCUtils.sortByTemplateConfig(templateName, values);
            let actualSorted = [
                {
                    domain_property: "provider_specialty_type",
                    values: ["PSYCHIATRIST"],
                },
                {
                    domain_property: "diagnosis_or_indication",
                    values: ["Pervasive Developmental Disorder"],
                },
            ];

            expect(sorted).toEqual(actualSorted);
        });
    });

    describe('sortSearchResultsByTemplate', () => {
        test('should sort the search list by all templates first then DCs after', () => {
            store.getState().savedDecisionConcepts = [
                {
                    category: {category_id: 2, description: null, name: "Drug"},
                    configuration: [],
                    dc_id: 227,
                    displayName: "Revatio Tablet,",
                    id: "Requested_Drug_Revatio_Tablet",
                    template: { name: "Requested_Drug" },
                    templateID: "Requested_Drug",
                    values: {},
                }
            ]

            let searchValues = [
                {
                    category: { category_id: 2, description: null, name: "Drug" },
                    configuration: [],
                    dc_id: 227,
                    displayName: "Revatio Tablet,",
                    id: "Requested_Drug_Revatio_Tablet",
                    template: { name: "Requested_Drug" },
                    templateID: "Requested_Drug",
                    values: {},
                },
                {
                    category: { category_id: 596, description: null, name: "Drug" },
                    configuration: [],
                    dc_id: 212,
                    displayName: "DEPRESSION, ADHD or ADD",
                    id: "Currently_On_Therapy_For_Diagnosis_DEPRESSION_ADHD_or_ADD",
                    template: {
                        name: "Currently_On_Therapy_For_Diagnosis", 
                        id: 304,
                        description: null,
                        displayName: "Currently On Therapy For Diagnosis",
                    },
                    templateID: "Currently_On_Therapy_For_Diagnosis",
                    values: {},
                }
            ]

            let sortedOptions = DCUtils.sortDecisionConcepts(searchValues)
            let actualSortedOptions = [
                {
                    category: { category_id: 596, description: null, name: "Drug" },
                    configuration: [],
                    dc_id: 212,
                    displayName: "DEPRESSION, ADHD or ADD",
                    id: "Currently_On_Therapy_For_Diagnosis_DEPRESSION_ADHD_or_ADD",
                    template: {
                        name: "Currently_On_Therapy_For_Diagnosis",
                        id: 304, description: null,
                        displayName: "Currently On Therapy For Diagnosis",
                    },
                    templateID: "Currently_On_Therapy_For_Diagnosis",
                    values: {},
                },
                {
                    category: { category_id: 2, description: null, name: "Drug" },
                    configuration: [],
                    dc_id: 227,
                    displayName: "Revatio Tablet,",
                    id: "Requested_Drug_Revatio_Tablet",
                    template: { name: "Requested_Drug" },
                    templateID: "Requested_Drug",
                    values: {},
                }
            ]

            expect(sortedOptions).toEqual(actualSortedOptions);
        });
    });

    describe('isInGuidelineBranchByPropAndValue()', () => {
        //TODO : have to figure out module  mocking in jest
        test.skip('should call getConceptFromActiveBranchByPropAndValue() and return truthy/falsy value', () => {
        //jest.mock('./dc-utils', () => {
        //       return {
        //           ...jest.requireActual('./dc-utils')
        //       }
        //   });
        //   DCUtils.mockImplementation(() => {
        //       return {
        //           ...jest.requireActual('./dc-utils'),
        //           getConceptFromActiveBranchByPropAndValue : jest.fn()
        //       };
        //   });
        //   DCUtils.getConceptFromActiveBranchByPropAndValue.mockReturnValueOnce({});
        //   console.log(DCUtils.getConceptFromActiveBranchByPropAndValue);
        //   let result = DCUtils.isInGuidelineBranchByPropAndValue(3, 'someProp', 'someValue3');
        //   
        //   expect(result).toBeTruthy();
        });
    });

    describe('tempValuesMatchConfigPoints', () => {
        test('should have the save button disabled (return true) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {};
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(true);
        });

        test('should have the save button disabled (return true) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {
                On_Requested_Drug_For_Duration: {
                    configurationValues: [
                        {
                            domain_property: "requested_drugname",
                            values: ["Adderall"],
                        }
                    ],
                    displayName: "Adderall",
                    name: "On_Requested_Drug_For_Duration_Adderall",
                }
            };
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(true);
        });

        test('should have the save button disabled (return true) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {
                On_Requested_Drug_For_Duration: {
                    configurationValues: [
                        {
                            domain_property: "requested_drugname",
                            values: [],
                        },
                        {
                            domain_property: "days_duration",
                            values: ["24"],
                        }
                    ],
                    displayName: ", 24 days",
                    name: "On_Requested_Drug_For_Duration__24",
                }
            };
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(true);
        });

        test('should have the save button disabled (return true) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {
                On_Requested_Drug_For_Duration: {
                    configurationValues: [
                        {
                            domain_property: "requested_drugname",
                            values: [],
                        },
                        {
                            domain_property: "days_duration",
                            values: [""],
                        }
                    ],
                    displayName: ",  days",
                    name: "On_Requested_Drug_For_Duration__",
                }
            };
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(true);
        });

        test('should have the save button disabled (return true) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {
                On_Requested_Drug_For_Duration: {
                    configurationValues: [
                        {
                            domain_property: "requested_drugname",
                            values: ["Adderall"],
                        },
                        {
                            domain_property: "days_duration",
                            values: [""],
                        }
                    ],
                    displayName: "Adderall,  days",
                    name: "On_Requested_Drug_For_Duration_Adderall_",
                }
            };
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(true);
        });

        test('should have the save button enable (return false) on new DC with 2 config type (autocomplete + textfield)', () => {
            let activeDC = {
                category: { category_id: 596, description: null, name: "Drug" },
                configuration: [
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "requested_drugname",
                        type: "autocomplete",
                    },
                    {
                        asConcept: undefined,
                        attrs: {},
                        dcNamePrefix: undefined,
                        id: "days_duration",
                        type: "textfield",
                    },
                ],
                description: null,
                id: 293,
                name: "On_Requested_Drug_For_Duration",
                displayName: "On Requested Drug For Duration",
            };
            let tempDc = {
                On_Requested_Drug_For_Duration: {
                    configurationValues: [
                        {
                            domain_property: "requested_drugname",
                            values: ["Adderall"],
                        },
                        {
                            domain_property: "days_duration",
                            values: ["24"],
                        }
                    ],
                    displayName: "Adderall, 24 days",
                    name: "On_Requested_Drug_For_Duration_Adderall_24",
                }
            };
            let result = DCUtils.tempValuesMatchConfigPoints(activeDC, tempDc);

            expect(result).toEqual(false);
        });
        // should propably do more test with diferent template and there posible tempDC config
            // {
            //     category: { category_id: 604, description: null, name: "Patient" },
            //     configuration: [
            //         {
            //             asConcept: undefined,
            //             attrs: {},
            //             dcNamePrefix: undefined,
            //             id: "min_age",
            //             type: "",
            //         },
            //         {
            //             asConcept: undefined,
            //             attrs: {},
            //             dcNamePrefix: undefined,
            //             id: "max_age",
            //             type: "threshold",
            //         },
            //     ],
            //     description: null,
            //     id: 302,
            //     name: "Age_Requirement",
            //     displayName: "Age Requirement",
            // }
            // {
            //     category: { category_id: 599, description: null, name: "Medical" },
            //     configuration: [
            //         {
            //             asConcept: undefined,
            //             attrs: {},
            //             dcNamePrefix: undefined,
            //             id: "diagnostic_procedure",
            //             type: "autocomplete",
            //         },
            //     ],
            //     description: null,
            //     id: 296,
            //     name: "Previous_Diagnostic_Procedure",
            //     displayName: "Previous Diagnostic Procedure",
            // }
        // We can also expend on the the number of scenario for tempDc.
        // We can also expend on the type of active dc pass (have some branching template dc, and some pre config dc)
        // to make sure it work even in case it should not be called.
    });
    describe('sortDCValues()', () => {
        test.skip('should sort the multi-select autocomplete forms in ASC order', () => {
            let values = {
                domain_property: "provider_specialty_type",
                values: [
                    "SLEEP",
                    "CARDIOLOGIST",
                    "PSYCHIATRIST",
                ]
            }

            let valuesSorted = DCUtils.sortDCValues(values)
            let actualSortedValues = {
                domain_property: "provider_specialty_type",
                values: [
                    "CARDIOLOGIST",
                    "PSYCHIATRIST",
                    "SLEEP"
                ]
            }

            expect(valuesSorted).toEqual(actualSortedValues)
        });
    });
});
