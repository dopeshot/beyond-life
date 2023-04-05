export interface paths {
  "/": {
    get: operations["AppController_getHello"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    STUFF: {
      first: string;
      second: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  AppController_getHello: {
    responses: {
      /** @description Hello World! */
      200: {
        content: {
          "application/json": components["schemas"]["STUFF"];
        };
      };
    };
  };
}
