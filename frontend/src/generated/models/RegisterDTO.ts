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
 * @interface RegisterDTO
 */
export interface RegisterDTO {
    /**
     * Email of the user
     * @type {string}
     * @memberof RegisterDTO
     */
    email: string;
    /**
     * Password for user
     * @type {string}
     * @memberof RegisterDTO
     */
    password: string;
    /**
     * Username for the user
     * @type {string}
     * @memberof RegisterDTO
     */
    username: string;
}

/**
 * Check if a given object implements the RegisterDTO interface.
 */
export function instanceOfRegisterDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "username" in value;

    return isInstance;
}

export function RegisterDTOFromJSON(json: any): RegisterDTO {
    return RegisterDTOFromJSONTyped(json, false);
}

export function RegisterDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
        'username': json['username'],
    };
}

export function RegisterDTOToJSON(value?: RegisterDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'username': value.username,
    };
}

