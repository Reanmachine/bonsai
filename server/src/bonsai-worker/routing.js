// Controllers
import RoomController       from "./controller/client/RoomController";
import UserController       from "./controller/client/UserController";
import SessionController    from "./controller/client/SessionController";


/**
 * Instantiates a new array of controller instances.
 * @returns {*[]}
 */
export function getDefaultControllers(tracker, models) {
    return [
        new RoomController(tracker, models),
        new UserController(tracker, models),
        new SessionController(tracker, models)
    ];
}