import type { components, paths } from './api.d.ts';

type STUFF = components['schemas']['STUFF'];

export function getHello(): STUFF {
  return { first: 'Hello', second: 'World' };
}

import createClient from "openapi-fetch";

const { get, post, put, patch, del } = createClient<paths>({
  baseUrl: "http://localhost:3001",
});

async function main() {
  const { data, error } = await get("/", {
  });
  console.log(typeof data)
  console.log(data, error)
}

main()