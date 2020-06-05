import * as GuidelineUtils from './guideline-utils';

describe('guideline utils tests', () => {
    describe('sortGuidelinesByStatus', () => {
        test('should should sort guidelines by `published` first', () => {
            let guidelines = [
              {
                creation_date: "2020-04-24T20:22:13.520Z",
                creator: "Tarek Kazak",
                decision_concepts: [],
                effective_date: "2020-04-24T20:21:49.471Z",
                guideline_id: 113,
                message: "OK",
                name: "Testing 4_24 take 2",
                product_id: "11222",
                status: "in progress",
                total_steps: 6,
                update_date: "2020-04-24T21:40:59.914Z",
                version: 1
              },
              {
                creation_date: "2020-04-24T20:22:13.520Z",
                creator: "Tarek Kazak",
                decision_concepts: [],
                effective_date: "2020-04-24T20:21:49.471Z",
                guideline_id: 113,
                message: "OK",
                name: "test 2",
                product_id: "11222",
                status: "published",
                total_steps: 6,
                update_date: "2020-04-24T21:40:59.914Z",
                version: 1
              }
            ]

            let sortedGuidelines = GuidelineUtils.sortGuidelinesByStatus(guidelines, "published")
            let actualSortedGuidelines = [
              {
                creation_date: "2020-04-24T20:22:13.520Z",
                creator: "Tarek Kazak",
                decision_concepts: [],
                effective_date: "2020-04-24T20:21:49.471Z",
                guideline_id: 113,
                message: "OK",
                name: "test 2",
                product_id: "11222",
                status: "published",
                total_steps: 6,
                update_date: "2020-04-24T21:40:59.914Z",
                version: 1
              },
              {
                creation_date: "2020-04-24T20:22:13.520Z",
                creator: "Tarek Kazak",
                decision_concepts: [],
                effective_date: "2020-04-24T20:21:49.471Z",
                guideline_id: 113,
                message: "OK",
                name: "Testing 4_24 take 2",
                product_id: "11222",
                status: "in progress",
                total_steps: 6,
                update_date: "2020-04-24T21:40:59.914Z",
                version: 1
              }
            ]

            expect(sortedGuidelines).toEqual(actualSortedGuidelines)
        });
    });

    describe('isGuidelinePublished', () => {
        test('should return true if guideline is `published`', () => {
            let guideline = {
            creation_date: "2020-04-24T20:22:13.520Z",
            creator: "Tarek Kazak",
            decision_concepts: [],
            effective_date: "2020-04-24T20:21:49.471Z",
            guideline_id: 113,
            message: "OK",
            name: "test 2",
            product_id: "11222",
            status: "published",
            total_steps: 6,
            update_date: "2020-04-24T21:40:59.914Z",
            version: 1
          }
          let isPublished = GuidelineUtils.isGuidelinePublished(guideline)
          expect(!!isPublished).toEqual(true)
        });
    });

    describe('isGuidelineInProgress', () => {
        test('should return true if guideline is `in progress`', () => {
            let guideline = {
              creation_date: "2020-04-24T20:22:13.520Z",
              creator: "Tarek Kazak",
              decision_concepts: [],
              effective_date: "2020-04-24T20:21:49.471Z",
              guideline_id: 113,
              message: "OK",
              name: "test 2",
              product_id: "11222",
              status: "in progress",
              total_steps: 6,
              update_date: "2020-04-24T21:40:59.914Z",
              version: 1
            }
            let isInProgress = GuidelineUtils.isGuidelineInProgress(guideline)
            expect(!!isInProgress).toEqual(true)
        });

        test('should fail true if guideline is ~`in progress`', () => {
            let guideline = {
              creation_date: "2020-04-24T20:22:13.520Z",
              creator: "Tarek Kazak",
              decision_concepts: [],
              effective_date: "2020-04-24T20:21:49.471Z",
              guideline_id: 113,
              message: "OK",
              name: "test 2",
              product_id: "11222",
              status: "in-progress",
              total_steps: 6,
              update_date: "2020-04-24T21:40:59.914Z",
              version: 1
            }

            let isInProgress = GuidelineUtils.isGuidelineInProgress(guideline)
            expect(!!isInProgress).toEqual(false)
        });
    });
    
    describe('validateSequence()', () => {

        test('should return { isValid : false , errors : [], warnings : [some warnings] } when sequence.length < totalStep', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 2,
                        code : ''
                    },
                    NO : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 3,
                    YES : {
                        action : 4,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 4,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }

            ];
            let result = GuidelineUtils.validateSequence(5, sequence);
            let expected = {
                isValid : false,
                errors : [],
                warnings : ['You must complete all the steps to generate paths']
            };
            expect(expected).toEqual(result);
        });

        test('should return { isValid : false , errors : [], warnings : [some warnings] } when sequence.length < totalStep branching', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 2,
                        code : ''
                    },
                    NO : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'branching',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'branching',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 4,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 3,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }

            ];
            let result = GuidelineUtils.validateSequence(4, sequence);
            let expected = {
                isValid : false,
                errors : [],
                warnings : ['You must complete all the steps to generate paths']
            };
            expect(expected).toEqual(result);
        });

        test('should return { isValid : true , errors : [] } when sequence.length >= totalStep', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 2,
                        code : ''
                    },
                    NO : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 3,
                    YES : {
                        action : 4,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 4,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }
            ];
            let result = GuidelineUtils.validateSequence(4, sequence);
            let expected = {
                isValid : true,
                errors : [],
                warnings : []
            };
            expect(result).toEqual(expected);
            result = GuidelineUtils.validateSequence(3, sequence);
            expect(result).toEqual(expected);
        });
        
        test('should return { isValid : true , errors : [], warnings [] when sequence.length >= totalStep with branching', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 2,
                        code : ''
                    },
                    NO : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'branching',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'branching',
                    dc_id : 0,
                    step : 2,
                    YES : {
                        action : 4,
                        code : ''
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 3,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 4,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }
            ];
            let result = GuidelineUtils.validateSequence(4, sequence);
            let expected = {
                isValid : true,
                errors : [],
                warnings :[]
            };
            expect(result).toEqual(expected);
            result = GuidelineUtils.validateSequence(3, sequence);
            expect(result).toEqual(expected);
        });
        
        test('should return { isValid : false , errors : [some errors] } when sequence.length >= totalStep and invalid gotos', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 5,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 1,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'standard',
                    dc_id : 2,
                    step : 3,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }
            ];
            let result = GuidelineUtils.validateSequence(3, sequence);
            let expected = {
                isValid : false,
                errors : [
                    {
                        step : "1",
                        goto : 5
                    }
                ],
                warnings : []
            };
            expect(result).toEqual(expected);
        });
        
        test('should return { isValid : false , errors : [some errors] } when sequence.length >= totalStep and invalid gotos with branching', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 5,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'branching',
                    dc_id : 1,
                    step : 2,
                    YES : {
                        action : 6,
                        code : ''
                    }
                },
                {
                    type : 'branching',
                    dc_id : 1,
                    step : 2,
                    YES : {
                        action : 3,
                        code : ''
                    }
                },
                {
                    type : 'standard',
                    dc_id : 2,
                    step : 3,
                    YES : {
                        action : 'approve',
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                }
            ];
            let result = GuidelineUtils.validateSequence(3, sequence);
            let expected = {
                isValid : false,
                errors : [
                    {
                        step : "1",
                        goto : 5
                    },
                    {
                        step : "2",
                        goto : 6
                    }
                ],
                warnings : []
            };
            expect(result).toEqual(expected);
        });


    });

    describe('getNextEmptyStep()', () => {
        test('should return next available step 4', () => {
            let sequence = [
                {
                    type : 'standard',
                    dc_id : 0,
                    step : 1,
                    YES : {
                        action : 5,
                        code : ''
                    },
                    NO : {
                        action : 'deny',
                        code : '100'
                    }
                },
                {
                    type : 'branching',
                    dc_id : 1,
                    step : 3,
                    YES : {
                        action : 3,
                        code : ''
                    }
                }
            ];
            let result = GuidelineUtils.getNextEmptyStep(2, sequence, 8);
            expect(result).toEqual({
                stepNo : 4,
                completed : false,
                stepName : ''
            });
        });
    });
});
