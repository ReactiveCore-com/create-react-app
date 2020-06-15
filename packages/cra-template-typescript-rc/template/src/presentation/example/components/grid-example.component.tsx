import React, { useState, useEffect } from 'react';
import { ModuleRegistry } from '@ag-grid-community/core'; 
import { LicenseManager } from '@ag-grid-enterprise/core';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { AgGridReact  } from 'ag-grid-react';
import { blue } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { IconComponent } from 'presentation/common/components/ui/icons/icon.component';
import { Link  } from 'react-router-dom';
import { ROUTES } from 'presentation/common/constants';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { RequestSalesInfoSignal } from "presentation/events"; 

import { ConfirmationDialogComponent } from 'presentation/common/components/ui/confirmation-dialog/confirmation-dialog';
import { PageTitleComponent } from 'presentation/common/components/ui/page-title';
import { mediateSalesInfoDependentMediator, mediateRequestSalesInfo } from 'mediator';

//NOTE:make sure you have a license for your specific application
//LicenseManager.setLicenseKey('CompanyName=ReactiveCore Inc,LicensedApplication=pa_mvp,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=0,AssetReference=AG-007407,ExpiryDate=18_March_2021_[v2]_MTYxNjAyNTYwMDAwMA==e0e5f9fb59722f3d697ae66bf1c6a302');

ModuleRegistry.registerModules([
    ColumnsToolPanelModule,
    RowGroupingModule,
    MenuModule,
    SetFilterModule,
    ClipboardModule,
    RangeSelectionModule
]);

const useStyles = makeStyles(theme => createStyles({
    root : {
        width: '100%',
        height: '100%',
    },
    groupLabel : {
        color : blue[700],
        lineHeight : '15px',
        fontSize : '12px'
    },
    gridHeader : {
    fontSize : '16px',
    color : '#333333',
    '&::after' : {
            borderColor : 'transparent !important'
        }
    },
    gridEditor : {
        padding: '50px 0',
        height: '500px',
        backgroundColor: 'transparent !important',
        '& .ag-root' : {
            borderRadius: '10px'
        }
    }
}));

const createGridViewModel = () => {
    return {
        columnDefs : [
            {
                headerName : 'Make',
		filter: 'agSetColumnFilter',
                field : 'make',
            },
            {
                headerName : 'Model',
		filter: 'agTextColumnFilter',
                field : 'model'
            },
            {
                headerName : 'Year',
		filter: 'agDateColumnFilter',
                field : 'year'
            },
            {
                headerName : 'Units Sold',
		filter: 'agNumberColumnFilter',
                field : 'quantity'
            },
            {
                headerName : 'Dealer Address',
		filter: 'agTextColumnFilter',
                field : 'address'
            },
            {
                headerName : 'Total Revenue',
		filter: 'agNumberColumnFilter',
                valueFormatter : (params) => {
		    return params.value && numeral(params.value).format('$0,0.00');	
		},
                valueGetter : (params) => {
		    return params.data && numeral(params.data.revenue).value();	
		},
		field : 'revenue',
                filterValueGetter : (params) => {
		    return numeral(params.data.revenue).value();	
		},
            },
            {
                headerName : 'Customer',
		filter: 'agTextColumnFilter',
		valueGetter : (params) => {
                    if(params.data) {
                        let { first, last } = params.data.customer;
                        return `${first} ${last}`;
                    }
		}
            },
            {
                headerName : 'Customer Email',
                field : 'email'
            },
            {
                headerName : 'Customer Phone',
                field : 'phone'
            }
        ]
    };
};

export const ExampleGridComponent = (props) => {
    const classes = useStyles({});
    let gridViewModel = createGridViewModel();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [rowData, setRowData] = useState([]);
    const columnDefs = [ ...gridViewModel.columnDefs ];

    useEffect(() => {
        return mediateSalesInfoDependentMediator(setRowData);
    }, []);

    useEffect(() => {
        let requestSalesInfoDataSignal = new RequestSalesInfoSignal();
        let mediator = mediateRequestSalesInfo(requestSalesInfoDataSignal);
        requestSalesInfoDataSignal.dispatch();
        return mediator.destroy;
    }, []);

    const handleConfirmationDialogCancel = () => {
        setConfirmationDialogOpen(false);
    };

    const handleConfirmationDialogOk = () => {
        setConfirmationDialogOpen(false);
    };

    let gridOptions:any = {
        defaultColDef: {
            //cellRenderer : 'pathCellRenderer',
            headerClass : classes.gridHeader,
	    sortable : true,
	    filter : true,
            resizable : true,
            editable : true, 
            enableRowGroup : true,
	    enableCellChangeFlash : true
        },
	floatingFilter : true,
        modules : [
	    ColumnsToolPanelModule,
	    RowGroupingModule,
	    MenuModule,
	    SetFilterModule,
            ClipboardModule,
            RangeSelectionModule
	],
	enableRangeSelection : true,
        enableRangeHandle : true,
        groupMultiAutoColumn : true,
        rowData,
	sideBar : 'columns',
        columnDefs,
        headerHeight : 50,
        groupDefaultExpanded : -1,
	rowGroupPanelShow : 'always',
        onGridReady : (grid) => {
            grid.api.setRowData(rowData);
        }
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
			component={Link}
			to={ROUTES.EXAMPLE}
			startIcon={<IconComponent name="contract" fontSize="small" />}
		    >
			back
		    </Button>
		</Box>
            </Box>
            <Box flexGrow={1} className={classes.gridEditor + ' ag-theme-balham'}>
                <AgGridReact {...gridOptions} />
            </Box>
            <Box display="flex" justifyContent="center">
                <Box display="flex" justifyContent="space-between" width="40%">
                    <Button
                        variant="outlined"
                        disabled
                        startIcon={<IconComponent name="print" fontSize="small" />}
                    >
                        print page
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setConfirmationDialogOpen(true)}
                        startIcon={<IconComponent name="publish" fontSize="small" />}
                    >
                        publish
                    </Button>
                </Box>
                <ConfirmationDialogComponent
                    open={ confirmationDialogOpen }
                    onCancel={ handleConfirmationDialogCancel }
                    onOk={ handleConfirmationDialogOk }
                    message="This action can not be undone. Do you want to proceed?"
                />
            </Box>
        </Box>
    );
};
