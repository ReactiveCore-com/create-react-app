export const getLabel = (val) => {
    return val.replace(/_/g, ' ');
};

export const trimToLength = (str: string, n: number = 50) => {
    let curString = str;
    if (!!curString && curString.length > n) {
        curString = `${curString.substr(0, n)}...`;
    }
    return curString;
};
