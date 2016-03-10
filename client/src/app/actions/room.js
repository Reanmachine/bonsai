import {
    Action
}                   from "../Constants";

import {
    debug
}                   from "../Utilities";

import {
    apiCall,
    updateLoading
}                   from "./common";

export function add(room) {
    return {
        type: Action.Room.ADD,
        room
    };
}

export function update(room) {
    return {
        type: Action.Room.ADD,
        room
    };
}

export function remove(room) {
    return {
        type: Action.Room.ADD,
        id: room.id,
        slug: room.slug
    };
}

function onRoomUpdateSuccess(dispatch, state, room) {
    if (state.room.collection.find(x => x.id === room.id || x.slug === room.slug)) {
        dispatch(update(room));
    } else {
        dispatch(add(room));
    }
}

function onRoomUpdateFailure(dispatch, identifier, message) {
    debug(`Unable to get room details: ${message}`);

    // Clear the loading
    dispatch(updateLoading(
        "room",
        identifier,
        false
    ));
}

/**
 * Action to update a room.
 * @param identifier The identifier to update.
 */
export function apiUpdateRoom(identifier) {
    return (dispatch, getState) => {

        // Notify the entity is loading
        dispatch(updateLoading(
            "room",
            identifier,
            true
        ));

        // Fire the api call
        dispatch(apiCall(
            "room",
            "details",
            [identifier],
            result => {
                // Good Result, update the data-source
                setTimeout(function() {
                    onRoomUpdateSuccess(dispatch, getState(), result.room);
                }, 5000);
            },
            result => onRoomUpdateFailure(dispatch, identifier, result)
        ));
    };
}