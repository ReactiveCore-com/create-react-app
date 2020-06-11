export const createServiceSettings = (method = 'GET', additionalSettings = {}) => {
    let defaultSettings = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    return {
        ...defaultSettings,
        ...additionalSettings
    };
};
