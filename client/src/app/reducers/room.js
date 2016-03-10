///////////////////////////////////////////////
// Room Reducer

import { combineReducers }      from "redux";

import { Action }               from "../Constants";

import {
    createLoadingReducer
}                               from "./common";

let roomDefaults = {
    collection: [],
    loading: {}
};

function testRoomIdentity(a, b) {
    return a.id === b.id || a.slug === b.slug;
}

function reduceRoom(state, action) {
    let { room } = action;

    switch (action.type) {
        case Action.Room.ADD:
            return {
                ...room
            };
        case Action.Room.UPDATE:
            if (testRoomIdentity(state, room)) {
                return state;
            }

            return {
                ...state,
                ...room
            };
        default:
            return state;
    }
}

function collection(state = roomDefaults.collection, action) {
    switch(action.type) {
        case Action.Room.ADD:
            return [
                ...state,
                reduceRoom(undefined, action)
            ];
        case Action.Room.UPDATE:
            return state.map(r => reduceRoom(t, action));
        case Action.Room.REMOVE:
            return state.filter(r => !testRoomIdentity(r, action));
        default:
            return state;
    }
}

function findRoomKeys(action) {
    if (!action.room) {
        return [];
    }

    return [
        action.room.id,
        action.room.slug
    ];
}

const loading = createLoadingReducer("room", [
    {
        type: Action.Room.ADD,
        keys: findRoomKeys
    },
    {
        type: Action.Room.UPDATE,
        keys: findRoomKeys
    }
]);

export default combineReducers({
    collection,
    loading
});