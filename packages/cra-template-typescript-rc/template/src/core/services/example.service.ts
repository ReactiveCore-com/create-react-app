import { getHost } from 'environment';
import { request } from './base.service';
import { createServiceSettings } from './services-utils';

export const getData = async () => {
    const APIURL = getHost();
    let settings = createServiceSettings();
    await request(`${APIURL}/example`, settings);
};
