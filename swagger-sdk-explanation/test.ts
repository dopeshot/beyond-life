import { components } from './api';

type STUFF = components['schemas']['STUFF'];

export function getHello(): STUFF {
  return { first: 'Hello', second: 'World' };
}
