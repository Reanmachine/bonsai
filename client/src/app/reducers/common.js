import {
    Action
}                   from "../Constants";

function clearOrSetLoading(state, key, isLoading) {
    if (isLoading) {
        state[key] = true;
    } else if (state[key]) {
        delete state[key];
    }
}

export function createLoadingReducer(entity, clearEvents = []) {
    let loadingDefaults = {};

    return function loadingReducer(state = loadingDefaults, action) {

        let clone = {...state};

        if (action.type === Action.Common.UPDATE_LOADING &&
            action.entity === entity) {

            clearOrSetLoading(clone, action.key, action.isLoading);

            return clone;
        }

        for(let clearEvent of clearEvents) {
            if (action.type === clearEvent.type) {
                let keys = clearEvent.keys(action);
                if (keys && keys.length > 0) {
                    for(let key of keys) {
                        clearOrSetLoading(clone, key, false);
                    }
                }
            }
        }

        return clone;
    }
}
