import {
    Medical,
    Drug,
    Provider,
    Patient,
    Bin,
    Pencil,
    List,
    ThumbUp,
    ThumbDown,
    Build,
    Gear,
    Check,
    Documents,
    Contract,
    Logo,
    Banner,
    User,
    Clear,
    Pathway,
    Eye,
    Expand,
    Search,
    ArrowBack,
    Print,
    Flowchart,
    Pdf,
    Publish,
    Login,
    Plus
} from '.';

const iconMap = {
    medical:  Medical,
    drug:  Drug,
    provider:  Provider,
    patient: Patient,
    logo: Logo,
    clear : Clear,
    banner: Banner,
    user: User,
    delete: Bin,
    check: Check,
    edit: Pencil,
    view: Eye,
    list: List,
    thumbup: ThumbUp,
    thumbdown: ThumbDown,
    build: Build,
    settings: Gear,
    documents: Documents,
    contract: Contract,
    pathway: Pathway,
    expand: Expand,
    search: Search,
    arrowback: ArrowBack,
    print: Print,
    flowchart: Flowchart,
    pdf: Pdf,
    publish: Publish,
    login: Login,
    add: Plus
};

export const iconProvider = (key: string) => {
    const icon = iconMap[key.toLowerCase()];
    if (!key || !icon) {
        throw `Error: Can't find icon with provided name ${key}.`
    }
    return icon;
}
