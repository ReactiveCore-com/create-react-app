const createServiceSettings = (method = 'GET', additionalSettings = {}) => {
    const defaultSettings = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return {
        ...defaultSettings,
        ...additionalSettings,
    };
};

export default createServiceSettings;
