export enum DECISION {
    APPROVE = 'approve',
    DENY = 'deny',
    GOTO = 'goto'
}

export enum DECISION_ANSWER {
    YES = 'YES',
    NO =  'NO'
}

//TODO: move this to a more appropiate file
export enum EXPANDER_VIEW {
    LIST = 'list',
    DETAILS = 'details'
}

export enum DECISION_PREFIX {
    APPROVE = "Duration =",
    DENY = "DRC ="
}

export enum DECISION_SUFFIX {
    APPROVE = "months",
    DENY = ""
}

export enum DCConfigurationType {
    STANDARD = 'standard',
    BRANCHING = 'branching'
};
