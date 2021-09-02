import config from '../environments/main';
import fetchError from '../helper/customException';


export default async function  checkRoute(fileId, collectionToCopyFrom, collectionToCopyTo) {
    try {
        
        const response = await fetch(config.baseUrl,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(
                { 
                    fileId: fileId, 
                    collectionToCopyFrom: collectionToCopyFrom, 
                    collectionToCopyTo: collectionToCopyTo, 
                })
        }, 2 * 10 * 60 * 1000);
        if (!response.ok) {
            throw response
        }
        const json_response = await response.json()
        return json_response;
    } catch (err) {
        if (typeof err.text === 'function') {
            let errorMessage = await err.text();
            throw new fetchError(err.status, errorMessage);
        } else {
            throw new Error(err);
        }
    }
}