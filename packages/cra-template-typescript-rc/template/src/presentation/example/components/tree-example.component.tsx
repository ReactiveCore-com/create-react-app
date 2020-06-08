import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles  } from '@material-ui/core/styles';
import { useHistory} from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import * as go from 'gojs';
import { ReactDiagram  } from 'gojs-react';
import { store } from 'core/managers/state-manager';
import { IconComponent } from 'presentation/common/components/ui/icons/icon.component';
import { Link  } from 'react-router-dom';
import { ROUTES } from 'presentation/common/constants';
import { PageTitleComponent  } from 'presentation/common/components/ui/page-title' 
//import { mediateTreeModelDependent } from 'mediators';

const useStyles = makeStyles(theme => createStyles({
    root : {
        width: '100%',
        height: '100%',
        display : 'flex',
        flexDirection : 'column'
    },
    container : {
        marginTop : '30px'
    },
    palette : {
        flexBasis : '10%',
        flexGrow : 1
    },
    diagramComponent : {
        height : '100%'
    },
    diagramWrapper: {
        paddingTop: '50px',
        flexGrow : 1
    },
    DFHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    DFHeaderText: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        '& > h2': {
            textTransform: 'uppercase',
            margin: 0,
            fontSize: '28px',
            fontWeight: 300,
            color: '#333'
        },
        '& > p': {
            color: '#333',
            margin: 0,
            fontSize: '20px',
            fontWeight: 200,
        }
    },
    DFHeaderActions: {
        '& > button': {
            marginLeft: '10px',
            minWidth: '220px'
        }
    },
    DFFooterActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > button': {
            minWidth: '240px',
            marginLeft: '10px'
        }
    }
}));

export const ExampleTreeComponent = (props) => {
    let classes:any = useStyles({});
    const history = useHistory();
    const [ diagram, setDiagram ] = useState(null);
    const [ diagramData, setDiagramData ] = useState([]);

    const decisionPathsClick = () => {
        
    };

    const guidelineStepsClick = () => {
       
    };

    useEffect(() => {
        //let unsubscribe = mediateTreeModelDependent(setDiagramData);

        //return () => {
        //    unsubscribe();
        //};
    }, []);

    useEffect(() => {
        if(diagram) {
            console.log('in there')
            diagram.clear();

            const mapFforGrid = (node) => {
                if(!node.parent || !node.parent.length) {
                    return null;
                }
                return node.parent.map((prt) => {
                    return {
                        from : prt,
                        category : node.answer,
                        to : node.key
                    }
                })             
            };

            let mapF =  mapFforGrid;
            let data =  [...diagramData];
            let linksArray = data.flatMap(mapF).filter((link) => !!link);
            let model= {
                'class': 'go.GraphLinksModel',
                'copiesArrays': true,
                'copiesArrayObjects': true,
                'nodeDataArray' : data,
                'linkDataArray' : linksArray
            };
            console.log('tree', data, linksArray);

            setTimeout(() => {
                console.log('tree', data, linksArray);
                diagram.model = go.Model.fromJson(model);
                diagram.layoutDiagram(true);
                diagram.alignDocument(go.Spot.TopLeft, go.Spot.TopLeft);
            }, 10);
        }

    }, [diagram, diagramData]);


    const initDiagram = () =>  {
        const $:any = go.GraphObject.make;
        let Patient = $(go.Brush, { color : '#e5885e' });
        let Provider = $(go.Brush, { color : '#4ca9d8' });
        let Drug = $(go.Brush, { color : '#62bfad' });
        let Medical = $(go.Brush, { color : '#8F65A5' });

        let colorsMap = {
            Patient,
            Drug,
            Medical,
            Provider
        };

        let textfont = "16px Arial, sans-serif";
        let categoryfont = "12px Arial, sans-serif";
        let stepfont = "12px Arial, sans-serif";
        // Common text styling
        function textStyle() {
            return {
                textAlign: 'left',
                editable: false
            }
        }

        const diagram =
            $(go.Diagram,
                {
                    //'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue'  },
                    // have mouse wheel events zoom in and out instead of scroll up and down
                    //"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                    initialAutoScale: go.Diagram.UniformToFill,
                   // initialPosition : go.Spot.Top,
                    initialDocumentSpot : go.Spot.Top,
                    'linkingTool.direction': go.LinkingTool.ForwardsOnly,
                    layout: $(go.LayeredDigraphLayout, { direction : 90, isInitial: false, isOngoing: false, layerSpacing: 125  }),
                    //layout: $(go.TreeLayout, { angle: 0, layerSpacing : 100, nodeSpacing : 10 }),
                    'undoManager.isEnabled': true
                });

        let defaultAdornment =
            $(go.Adornment, 'Spot',
                $(go.Panel, 'Auto',
                    $(go.Shape, { fill: null, stroke: 'dodgerblue', strokeWidth: 4  }),
                    $(go.Placeholder)),
                // the button to create a 'next' node, at the top-right corner
                $('Button',
                    {
                        alignment: go.Spot.TopRight,
                        click: addNodeAndLink
                    },  // this function is defined below
                    new go.Binding('visible', '', function(a) { return !a.diagram.isReadOnly;  }).ofObject(),
                    $(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6)  })
                ),
            );

        function createTemplate(category) {
            let color = colorsMap[category];
            return $(go.Node, 'Auto',
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel,
                    'Auto',
                    {
                        defaultStretch: go.GraphObject.Horizontal,
                        background: 'white',
                        width : 300,
                        height : 100,
                        portId: '', fromLinkable: true, cursor: 'pointer', fromEndSegmentLength: 40
                    },
                    $(go.Shape, 'RoundedRectangle', { fill: "transparent", stroke: "lightgray", stretch : go.GraphObject.Fill  }),
                    $(go.Shape, 'RoundedRectangle',  { fill: color, width : 3, height : 50, margin : new go.Margin(5,0,0,5), stroke : 'transparent', alignment : go.Spot.TopLeft }),
                    $(go.Picture, { alignment : go.Spot.TopRight, desiredSize: new go.Size(30, 30), margin : new go.Margin(10, 10, 0,0 ), source: `/assets/${category.toLowerCase()}.svg` }),
                    $(go.Panel, 'Vertical',
                        {
                            defaultStretch: go.GraphObject.Horizontal,
                        },
                        $(go.TextBlock, { ...textStyle(),  verticalAlignment : go.Spot.Center, height : 67, font : textfont, margin : new go.Margin(0, 0, 0, 20) }, new go.Binding('text', 'text')),
                        $(go.Panel, 'Auto',
                            { height : 30, defaultStretch: go.GraphObject.Horizontal },
                            $(go.Shape, 'RoundedRectangle',  { fill: color, stretch : go.GraphObject.Fill, stroke : null }),
                            $(go.TextBlock, { ...textStyle(), font : categoryfont, stroke : 'white', margin : new go.Margin(0,0,0,20) }, new go.Binding('text', 'categoryText').makeTwoWay()),
                            $(go.Panel, 'Auto', 
                                { alignment :  go.Spot.Right, height : 18, width: 18 },
                                $(go.Shape, 'Circle',  { fill: 'white', stretch : go.GraphObject.Fill, stroke : null }),
                                $(go.TextBlock, { ...textStyle(), font : stepfont, stroke : color,  }, new go.Binding('text', 'step').makeTwoWay()),
                            )
                        )
                    )
                )
            );
        }

        function createBranchTemplate(category) {
            return $(go.Node, 'Auto',
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel,
                    'Auto',
                    {
                        defaultStretch: go.GraphObject.Horizontal,
                        background: 'white',
                        width : 300,
                        height : 50,
                        portId: '', fromLinkable: true, cursor: 'pointer', fromEndSegmentLength: 40
                    },
                    $(go.Shape, 'RoundedRectangle', { fill: "transparent", stroke: "lightgray", stretch : go.GraphObject.Fill  }),
                    $(go.TextBlock, { ...textStyle(), font : textfont, margin : new go.Margin(15, 0, 10, 20) }, new go.Binding('text', 'text')),
                )
            );
        }
        // define the Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',
                { selectionAdornmentTemplate: defaultAdornment  },
                //$('TreeExpanderButton'),
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                // define the node's outer shape, which will surround the TextBlock
                $(go.Shape, 'Rectangle',
                    {
                        fill: 'white', stroke: 'black',
                        portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                        toEndSegmentLength: 50, fromEndSegmentLength: 40
                    }
                ),
                $(go.TextBlock, 'Page',
                    {
                        margin: 6,
                        editable: true,
                        //doubleClick : (evt, node) =>  {
                        //    setQueryNodeToEdit(node);
                        //    setEditQuery(true);
                        //}
                    },
                    new go.Binding('text', 'text').makeTwoWay()
                )
            );

        diagram.nodeTemplateMap.add('approve', 
            $(go.Node, 'Auto',
                { selectionAdornmentTemplate: defaultAdornment  },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                //$('TreeExpanderButton'),
                $(go.Panel, 'Vertical', 
                   $(go.Panel, 'Auto', 
                        $(go.Shape, 'RoundedRectangle',
                            {
                                width : 100,
                                fill: 'white', stroke: '#03A485',
                                portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                                toEndSegmentLength: 50, fromEndSegmentLength: 40
                            }
                        ),
                        $(go.TextBlock, 'Page',
                            {
                                margin: 6,
                                editable: false,
                                font : textfont
                            },
                            new go.Binding('text', 'text').makeTwoWay()
                        )
                   ), 
                   $(go.Shape, "LineV", { width: 40, height: 20, fill: null  }),
                   $(go.Panel, 'Auto', 
                        $(go.Shape, 'RoundedRectangle',
                            {
                                width : 100,
                                fill: 'white', stroke: '#03A485',
                                cursor: 'pointer',
                                toEndSegmentLength: 50, fromEndSegmentLength: 40
                            }
                        ),
                        $(go.Panel, 'Auto', 'Horizontal',
                            $(go.TextBlock, 'Page',
                                {
                                    margin: 6,
                                    editable: false,
                                    font : textfont
                                },
                                new go.Binding('text', 'code').makeTwoWay()
                            ),
                            $(go.TextBlock, 'Page',
                                {
                                    margin: new go.Margin(6, 6, 6, 0),
                                    editable: false,
                                    font : textfont,
                                    text: 'months'
                                }
                            )
                        )
                   ) 
                )
            )
        );

        diagram.nodeTemplateMap.add('deny', 
            $(go.Node, 'Auto',
                { selectionAdornmentTemplate: defaultAdornment },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                //$('TreeExpanderButton'),
                $(go.Panel, 'Vertical', 
                   $(go.Panel, 'Auto', 
                        $(go.Shape, 'RoundedRectangle',
                            {
                                width : 100,
                                fill: 'white', stroke: '#D35855',
                                portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                                toEndSegmentLength: 50, fromEndSegmentLength: 40
                            }
                        ),
                        $(go.TextBlock, 'Page',
                            {
                                margin: 6,
                                editable: false,
                                font : textfont
                            },
                            new go.Binding('text', 'text').makeTwoWay()
                        )
                   ), 
                   $(go.Shape, "LineV", { width: 40, height: 20, fill: null  }),
                   $(go.Panel, 'Auto', 
                        $(go.Shape, 'RoundedRectangle',
                            {
                                width : 100,
                                fill: 'white', stroke: '#D35855',
                                cursor: 'pointer',
                                toEndSegmentLength: 50, fromEndSegmentLength: 40
                            }
                        ),
                        $(go.Panel, 'Auto', 'Horizontal',
                            $(go.TextBlock, 'Page',
                                {
                                    margin: new go.Margin(6, 0, 6, 6),
                                    editable: false,
                                    font : textfont,
                                    text: 'DRC='
                                }
                            ),
                            $(go.TextBlock, 'Page',
                                {
                                    margin: new go.Margin(6, 6, 6, 0),
                                    editable: false,
                                    font : textfont
                                },
                                new go.Binding('text', 'code').makeTwoWay()
                            )
                        )
                   ) 
                )
            )
        );

        diagram.nodeTemplateMap.add('Medical', createTemplate('Medical'));
        diagram.nodeTemplateMap.add('Drug', createTemplate('Drug'));
        diagram.nodeTemplateMap.add('Patient', createTemplate('Patient'));
        diagram.nodeTemplateMap.add('Provider', createTemplate('Provider'));
        diagram.nodeTemplateMap.add('Medical_branch', createBranchTemplate('Medical'));
        diagram.nodeTemplateMap.add('Drug_branch', createBranchTemplate('Drug'));
        diagram.nodeTemplateMap.add('Patient_branch', createBranchTemplate('Patient'));
        diagram.nodeTemplateMap.add('Provider_branch', createBranchTemplate('Provider'));

        // clicking the button of a default node inserts a new node to the right of the selected node,
        // and adds a link to that new node
        function addNodeAndLink(e, obj) {
            let adorn = obj.part;
            if (adorn === null) return;
            e.handled = true;
            let diagram = adorn.diagram;
            diagram.startTransaction('Add State');
            // get the node data for which the user clicked the button
            let fromNode = adorn.adornedPart;
            let fromData = fromNode.data;
            // create a new 'State' data object, positioned off to the right of the adorned Node
            let toData:any = { text: 'new'  };
            let p = fromNode.location;
            toData.loc = p.x + 200 + ' ' + p.y;  // the 'loc' property is a string, not a Point object
            // add the new node data to the model
            let model = diagram.model;
            model.addNodeData(toData);
            // create a link data from the old node data to the new node data
            let linkdata = {};
            linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
            linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
            // and add the link data to the model
            model.addLinkData(linkdata);
            // select the new Node
            let newnode = diagram.findNodeForData(toData);
            diagram.select(newnode);
            diagram.commitTransaction('Add State');
        }

        diagram.linkTemplate =
                $(go.Link,
                      { routing: go.Link.Normal, corner: 1  },
                      $(go.Shape));


        diagram.linkTemplateMap.add('yes', 
            $(go.Link,
                $(go.Shape, { stroke : '#03A485' })
            ) 
        );

        diagram.linkTemplateMap.add('no', 
            $(go.Link,
                $(go.Shape, { stroke : '#D35855' })
            ) 
        );
        setDiagram(diagram);
        console.log('init diagram')
        return diagram;
    };

    return(
        <Box display="flex" flexDirection="column" width={1}>
            <Box display="flex">
                <Box flexGrow={1}>
                    <PageTitleComponent 
                        title="Decision pathway generation"
                        subtitle="View all the decision pathways within the guideline"
                    />
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<IconComponent name="pathway" fontSize="small" />} 
                        to={ROUTES.EXAMPLE_GRID}
                        component={Link}>
                        view grid
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<IconComponent name="contract" fontSize="small" />} 
                        to={ROUTES.EXAMPLE}
                        component={Link}>
                        back
                    </Button>
                </Box>
            </Box>
            <Box className={classes.diagramWrapper}>
                <ReactDiagram
                    initDiagram={initDiagram}
                    skipsDiagramUpdate={false}
                    nodeDataArray={[]}
                    divClassName={classes.diagramComponent}
                    onModelChange={(evt) => {console.log(evt)}}
                />
            </Box>
        </Box>
    );
};
