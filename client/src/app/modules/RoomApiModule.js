import ApiModule from "../../api/ApiModule";

import {
    Api
}                           from "../Constants";

import {
    debug
}                           from "../Utilities";

//import * as SessionActions   from "../actions/session";

export default class RoomApiModule extends ApiModule {

    constructor(dispatch) {
        super();

        this.dispatch = dispatch;
    }

    get key() {
        return "room";
    }

    /**
     * API: Room - Create
     *
     * Create's a new room in the system.
     *
     * @param name Name of the room to create
     * @param slug Slug for the room url
     * @param summary Summary of the room
     * @param description Full Description of the room
     * @returns {*}
     */
    create(
        name,
        slug,
        summary,
        description
    ) {
        var payload = {
            name,
            slug,
            summary,
            description
        };

        return this.send(
            Api.Room.CREATE,
            payload
        );
    }

    /**
     * API: Room - Details
     *
     * Update the details of a room.
     *
     * @param identifier
     * @returns {*}
     */
    details(identifier) {
        return this.send(
            Api.Room.DETAILS,
            {
                identifier,
            }
        );
    }

    /**
     * API: Room - Remove
     *
     * Remove a room.
     *
     * @param identifier
     * @returns {*}
     */
    remove(identifier) {
        return this.send(
            Api.Room.REMOVE,
            {
                identifier
            }
        );
    }
}

