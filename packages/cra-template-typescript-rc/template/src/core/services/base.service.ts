const request = async (url, settings) => {
    let response;
    try {
        response = await fetch(url, settings);
        const result = response.json();
        if (!response.ok) {
            throw result;
        }
    } catch (err) {
        console.error(err);
    }
};

export default request;
