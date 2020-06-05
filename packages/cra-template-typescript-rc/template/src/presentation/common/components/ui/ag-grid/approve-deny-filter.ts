export class ApproveDenyFilter {
    eGui: any;
    rbAll: any;
    rbApproved: any;
    rbDenied: any;
    filterActive: boolean;
    filterChangedCallback: any;
    valueGetter: any;

    constructor() {
        this.onRbChanged = this.onRbChanged.bind(this);
    }

    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML =
                '<label for="rbAll" style="display: block; padding: 10px 13px;font-weight: bold;background: #F2F2F2;">' +
                    '<input type="radio" checked name="ApproveDenyFilter" id="rbAll" filter-checkbox="true" style="display: none;"/>' +
                    'All' + 
                '</label>' +
                '<label for="rbApproved" style="display: block; padding: 10px 13px">' +    
                    '<input type="radio" name="ApproveDenyFilter" id="rbApproved" filter-checkbox="true" style="display: none;"/>' +
                    'Approved' + 
                '</label>' +
                '<label for="rbDenied" style="display: block; padding: 10px 13px">' +
                    '<input type="radio" name="ApproveDenyFilter" id="rbDenied" filter-checkbox="true" style="display: none;"/>' +
                    'Denied' + 
                '</label>';
        this.rbAll = this.eGui.querySelector('#rbAll');
        this.rbAll.addEventListener('change', this.onRbChanged);
        this.rbApproved = this.eGui.querySelector('#rbApproved');
        this.rbApproved.addEventListener('change', this.onRbChanged);
        this.rbDenied = this.eGui.querySelector('#rbDenied');
        this.rbDenied.addEventListener('change', this.onRbChanged);
        this.filterActive = false;
        this.filterChangedCallback = params.filterChangedCallback;
        this.valueGetter = params.valueGetter;
    }

    onRbChanged(ev) {
        const label = ev.currentTarget.parentNode;
        const container = label.parentNode;
        for(let i = 0; i < container.children.length; i++) {
            container.children[i].style.backgroundColor = 'transparent';
            container.children[i].style.fontWeight = 'normal';
        }
        label.style.backgroundColor = '#F2F2F2';
        label.style.fontWeight = 'bold';
        this.filterActive = !this.rbAll.checked;
        this.filterChangedCallback();        
    }

    getGui() {
        return this.eGui;
    }

    //TODO: requried by interface or breaks
    setModel(model) {
        if(!model) {
            this.filterActive = false;
            this.filterChangedCallback();        
        }
    }

    destroy() {
        this.rbApproved.removeEventListener('change', this.onRbChanged);
        this.rbAll.removeEventListener('change', this.onRbChanged);
        this.rbDenied.removeEventListener('change', this.onRbChanged);
    }

    doesFilterPass(params) {
        return this.rbAll.checked ||
               (!!params.data.approve && this.rbApproved.checked) ||
               (!!params.data.deny && this.rbDenied.checked);
    };
    
    isFilterActive() {
        return this.filterActive;
    };
}
