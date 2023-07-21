/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LoginDTO
 */
export interface LoginDTO {
    /**
     * Email of the user
     * @type {string}
     * @memberof LoginDTO
     */
    email: string;
    /**
     * Password for user
     * @type {string}
     * @memberof LoginDTO
     */
    password: string;
}

/**
 * Check if a given object implements the LoginDTO interface.
 */
export function instanceOfLoginDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function LoginDTOFromJSON(json: any): LoginDTO {
    return LoginDTOFromJSONTyped(json, false);
}

export function LoginDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function LoginDTOToJSON(value?: LoginDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
    };
}

