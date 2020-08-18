import createServiceSettings from './services-utils';

const request = async (url, settings = {}) => {
    const mergedSettings = {
        ...createServiceSettings(),
        ...settings,
    };
    let response;
    try {
        response = await fetch(url, mergedSettings);
        if (!response.ok) {
            throw response;
        }
        const result = await response.json();
        return result;
    } catch (err) {
        throw err;
    }
};

export default request;
