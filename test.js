import http from 'k6/http';
import { sleep } from 'k6';
import { BearerToken } from './auth.js';
import { Generator } from './param-generator.js';
import { check } from 'k6';
const paramGenerator=new Generator();
const bearer =new BearerToken();
export const options = {
    scenarios: {
      constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 50,
        timeUnit: '1s', 
        duration: '10m',
        preAllocatedVUs: 1,
        maxVUs: 1, 
      },
    },
  };
export function setup() {
    //const { status, token } = bearer.generate();
   
    return {
        headers: {
            'Content-Type': 'application/json',
            'API-Version': 1,           
            //'Authorization': 'Bearer '+token.access_token,
            'user-agent': 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 99.0.4844.74 Safari / 537.36 Edg / 99.0.1150.46'
        },
        tags: { type: 'apicall' }
    }
  }
export default function (params) { 
    const response = http.get('https://api.zippopotam.us/'+paramGenerator.generate(),params);
  check(response, {
      'is status 200': (r) => r.status === 200,
  });
    sleep(1);
}
