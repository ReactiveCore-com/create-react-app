const environment = {
    host: '',
};

export const getHost = () => {
    return environment.host;
};

export const setHost = (host) => {
    environment.host = host;
    return environment.host;
};
