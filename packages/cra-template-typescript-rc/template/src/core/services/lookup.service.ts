import { createServiceSettings } from 'core/services/services-utils';
import { getHost } from 'environment';
import { lookupMap } from 'data/test-data';

export const getLookup = async (lookup): Promise<any> => {
    let settings = createServiceSettings();
    const APIURL = getHost();
    let fetchResponse;
    try {
        fetchResponse = await fetch(`${APIURL}lookup_values?uri=${lookup.lookupURI}&keycol=${lookup.lookupKeyCol}`, settings);
        return await fetchResponse.json();
    } catch(e) {
        return await Promise.resolve(JSON.parse(lookupMap[lookup.lookupURI][lookup.lookupKeyCol]));
    }
};
