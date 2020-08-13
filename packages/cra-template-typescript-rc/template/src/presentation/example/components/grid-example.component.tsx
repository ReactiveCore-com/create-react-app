import React, { useState, useEffect } from "react";
import {
    ModuleRegistry,
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    ClipboardModule,
    RowGroupingModule,
    MenuModule,
    SetFilterModule,
    RangeSelectionModule,
    LicenseManager,
} from "@ag-grid-enterprise/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { blue } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as numeral from "numeral";

import { ROUTES } from "presentation/common/constants";
import IconComponent from "presentation/common/components/ui/icons/icon.component";
import PageTitleComponent from "presentation/common/components/ui/page-title";
import { RequestSalesInfoSignal } from "presentation/events";
import { mediateSalesInfoDependentMediator, mediateRequestSalesInfo } from "mediator";
import { ModalDialogComponent } from 'presentation/common/components/ui/modal';

// NOTE:make sure you have a license for your specific application
LicenseManager.setLicenseKey(
    "CompanyName=ReactiveCore Inc,LicensedApplication=pa_mvp,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=0,AssetReference=AG-007407,ExpiryDate=18_March_2021_[v2]_MTYxNjAyNTYwMDAwMA==e0e5f9fb59722f3d697ae66bf1c6a302",
);

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    RowGroupingModule,
    MenuModule,
    SetFilterModule,
    ClipboardModule,
    RangeSelectionModule,
]);

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
        },
        groupLabel: {
            color: blue[700],
            lineHeight: "15px",
            fontSize: "12px",
        },
        gridHeader: {
            fontSize: "16px",
            color: "#333333",
            "&::after": {
                borderColor: "transparent !important",
            },
        },
        gridEditor: {
            padding: "50px 0",
            height: "500px",
            backgroundColor: "transparent !important",
            "& .ag-root": {
                borderRadius: "10px",
            },
        },
    }),
);

const createGridViewModel = () => {
    return {
        columnDefs: [
            {
                headerName: "Make",
                filter: "agSetColumnFilter",
                field: "make",
            },
            {
                headerName: "Model",
                filter: "agTextColumnFilter",
                field: "model",
            },
            {
                headerName: "Year",
                filter: "agDateColumnFilter",
                field: "year",
            },
            {
                headerName: "Units Sold",
                filter: "agNumberColumnFilter",
                field: "quantity",
            },
            {
                headerName: "Dealer Address",
                filter: "agTextColumnFilter",
                field: "address",
            },
            {
                headerName: "Total Revenue",
                filter: "agNumberColumnFilter",
                valueFormatter: (params) => {
                    return params.value && numeral(params.value).format("$0,0.00");
                },
                valueGetter: (params) => {
                    return params.data && numeral(params.data.revenue).value();
                },
                field: "revenue",
                filterValueGetter: (params) => {
                    return numeral(params.data.revenue).value();
                },
            },
            {
                headerName: "Customer",
                filter: "agTextColumnFilter",
                valueGetter: (params) => {
                    if (params.data) {
                        const { first, last } = params.data.customer;
                        return `${first} ${last}`;
                    }

                    return "";
                },
            },
            {
                headerName: "Customer Email",
                field: "email",
            },
            {
                headerName: "Customer Phone",
                field: "phone",
            },
        ],
    };
};

const ExampleGridComponent = () => {
    const classes = useStyles({});
    const gridViewModel = createGridViewModel();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [rowData, setRowData] = useState([]);
    const columnDefs = [...gridViewModel.columnDefs];

    useEffect(() => {
        return mediateSalesInfoDependentMediator(setRowData);
    }, []);

    useEffect(() => {
        const requestSalesInfoDataSignal = new RequestSalesInfoSignal();
        const mediator = mediateRequestSalesInfo(requestSalesInfoDataSignal);
        requestSalesInfoDataSignal.dispatch();
        return mediator.destroy;
    }, []);

    const handleConfirmationDialogCancel = () => {
        setConfirmationDialogOpen(false);
    };

    const handleConfirmationDialogOk = () => {
        setConfirmationDialogOpen(false);
    };

    const gridOptions: any = {
        defaultColDef: {
            headerClass: classes.gridHeader,
            sortable: true,
            filter: true,
            resizable: true,
            editable: true,
            enableRowGroup: true,
            enableCellChangeFlash: true,
        },
        floatingFilter: true,
        modules: [
            ColumnsToolPanelModule,
            RowGroupingModule,
            MenuModule,
            SetFilterModule,
            ClipboardModule,
            RangeSelectionModule,
        ],
        enableRangeSelection: true,
        enableRangeHandle: true,
        groupMultiAutoColumn: true,
        rowData,
        sideBar: "columns",
        columnDefs,
        headerHeight: 50,
        groupDefaultExpanded: -1,
        rowGroupPanelShow: "always",
        onGridReady: (grid) => {
            grid.api.setRowData(rowData);
        },
    };

    return (
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
            <Box flexGrow={1} className={`${classes.gridEditor} ag-theme-balham`}>
                <AgGridReact {...gridOptions} />
            </Box>
            <Box display="flex" justifyContent="center">
                <Box display="flex" justifyContent="space-between" width="40%">
                    <Button variant="outlined" disabled startIcon={<IconComponent name="print" fontSize="small" />}>
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
                <ModalDialogComponent
                    open={confirmationDialogOpen}
                    onCancel={handleConfirmationDialogCancel}
                    onOk={handleConfirmationDialogOk}
                    message="This action can not be undone. Do you want to proceed?"
                />
            </Box>
        </Box>
    );
};

export default ExampleGridComponent;
