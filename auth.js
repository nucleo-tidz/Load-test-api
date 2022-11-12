import http from 'k6/http';
export class BearerToken
{

 generate() 
 {
    const requestBody = {
        grant_type: 'client_credentials',
        client_id: '<clientid>',
        client_secret: '<client token>'
    };
    const response = http.post('<token url>', requestBody, {
        responseType: 'text',
        tags: { type: 'authentication' }});       
    return {
        status: response.status,
        token: response.json()
    };
 }

}
