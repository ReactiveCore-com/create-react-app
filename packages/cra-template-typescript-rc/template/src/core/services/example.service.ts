import { getHost } from 'environment';
import { request } from './base.service';
import { createServiceSettings } from './services-utils';
import { rowData } from 'data/example-data';

export const getData = async () => {
    //NOTE: below is the proper code
    //const APIURL = getHost();
    //let settings = createServiceSettings();
    //await request(`${APIURL}/example`, settings);
    //NOTE: fake code for exmaple
    return Promise.resolve(rowData);
};
