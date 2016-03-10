/////////////////////////////////////////////
// Global Actions
//
// Note: This may be imported by other action creators

import {
    Action
}                       from "../Constants";

/**
 * Call a method on an api module.
 * @param module The module to lookup.
 * @param method The module method to execute.
 * @param arguments The arguments to pass to the api method.
 * @param onSuccess The success handler .
 * @param onFailure The failure handler.
 *
 * @returns {{type: string, module: *, method: *, arguments: *, onSuccess: *, onFailure: *}}
 */
export function apiCall(
    module,
    method,
    args,
    onSuccess,
    onFailure
) {
    return {
        type: Action.API.CALL,
        module,
        method,
        args,
        onSuccess,
        onFailure
    };
}

/**
 * Call an api operation via callback.
 *
 * @param callback The callback to execute.
 * @returns {{type: *, callback: *}}
 */
export function apiCallback(
    callback
) {
    return {
        type: Action.API.CALLBACK,
        callback
    };
}

/**
 * Set the loading status for an entity.
 *
 * @param entity The entity type that's loading.
 * @param key The key that's loading.
 * @param isLoading The loading status.
 */
export function updateLoading(entity, key, isLoading) {
    return {
        type: Action.Common.UPDATE_LOADING,
        entity,
        key,
        isLoading
    };
}