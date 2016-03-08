import Sequelize        from "sequelize";

import {
    makeSuccess,
    makeFailure,
    uuid
}                       from "bonsai-engine/utilities";

import {
    createRoutes
}                       from "bonsai-engine/routing";

export default class RoomController {

    constructor(tracker, models) {
        this.tracker = tracker;
        this.models = models;

        this.routes = createRoutes(this, {
            'client.room.create': this.create,
            'client.room.details': this.details,
            'client.room.remove': this.remove
        });
    }

    async create(message) {
        var { payload, context } = message;

        var {
            name,
            slug,
            summary,
            description
        } = payload;

        var { session, user } = context;

        if (!user || !session) {
            return makeFailure(
                "You must be logged in to create a room."
            );
        }

        let foundRoom = await this.models.Room.findOne({
            where: {slug: slug}
        });

        if (foundRoom) {
            return makeFailure(
                `A room with slug '${slug}' already exists.`
            );
        }

        let r = await this.models.Room.create({
            owner_id: user,
            name,
            slug,
            summary,
            description,
            created: Date.now(),
            last: Date.now()
        });

        // TODO: Auto-Follow

        // TODO: Broadcast Creation

        return { success: true };
    }

    async details(message) {

        var { payload, context } = message;

        var {
            identifier, // id or slug
        } = payload;

        let foundRoom = await this.models.Room.findOne({
            where: Sequelize.or(
                {id: identifier},
                {slug: identifier}
            )
        });

        if (!foundRoom) {
            return makeFailure(
                `Unable to find room by identifier '${identifier}'.`
            );
        } else {
            return makeSuccess({
                room: foundRoom
            });
        }
    }

    async remove(message) {
        var { payload, context } = message;

        var {
            identifier, // id or slug
        } = payload;

        var { session, user } = context;

        if (!user || !session) {
            return makeFailure(
                "You must be logged in to remove a room."
            );
        }


        let r = await this.models.Room.findOne({
            where: Sequelize.or(
                {id: identifier},
                {slug: identifier}
            )
        });

        if (!r) {
            return makeFailure(
                `A room with identifier '${identifier}' does not exist.`
            );
        }

        if (user != r.owner_id) {
            return makeFailure(
                `You are not the owner of '${r.slug}'.`
            );
        }

        await r.destroy();

        // TODO: Related Cleanup

        // TODO: Broadcast Deletion

        return { success: true };
    }
};
