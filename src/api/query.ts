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
    config: normalizeParams(params),
  });

  return response.data.result;
}

const normalizeParams = (params: RequestParam) => {
  const normalizedParams: RequestParam = {};
  for (const key in params) {
    normalizedParams[convertString(key)] =
      typeof params[key] === 'string'
        ? convertString(params[key] as string)
        : params[key];
  }

  return normalizedParams;
};

function convertString(str: string) {
  // convert string to lowercase
  str = str.toLowerCase();

  // replace spaces with underscores
  str = str.replace(/\s+/g, '_');

  // return the modified string
  return str;
}
