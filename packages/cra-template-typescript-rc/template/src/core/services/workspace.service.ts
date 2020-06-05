import { getHost } from 'environment';

export const updateWorkspace = async () => {
    const APIURL = getHost();
    await fetch(`${APIURL}update_workspace`); //hardcoded for now (pa_02_ws)
};
