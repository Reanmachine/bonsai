import RoomApiModule        from "./RoomApiModule";
import SessionApiModule     from "./SessionApiModule";
import SystemApiModule      from "./SystemApiModule";

export function appModulesFactory(
    dispatch,
    getState
) {
    return [
        new RoomApiModule(dispatch),
        new SessionApiModule(dispatch),
        new SystemApiModule(dispatch, getState)
    ];
}
