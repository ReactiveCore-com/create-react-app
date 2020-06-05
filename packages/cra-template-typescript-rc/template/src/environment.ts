const environment = {
    host : ''
}

export const getHost = () => {
    return environment.host;
}

export const setHost = (host) => {
    return environment.host = host;
}
