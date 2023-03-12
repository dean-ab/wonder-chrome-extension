import axios from 'axios';
import { RequestParam } from '../types/RequestParams';

const client = axios.create({
  // baseURL: 'http://localhost:3000',
  // baseURL: 'https://wonder-api.herokuapp.com',
  baseURL: 'https://wonder-api.fly.dev/',
  withCredentials: false,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export async function query(
  textInput: string,
  operation: string,
  action: string,
  params: RequestParam,
): Promise<string> {
  // return Promise.resolve('This is text returned from the server');
  const response = await client.post('v1/query', {
    textInput,
    operation,
    action,
    config: params,
  });
  console.log('FLAG __ query[28]', response);
  console.log('FLAG __ query[28]', response.data);
  // await sleep(1000);

  return response.data.result;
}
