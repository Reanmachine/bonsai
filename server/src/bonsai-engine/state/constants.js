export const ActionTypes = {
    // Connection
    CONNECTION_OPEN: 'CONNECTION_OPEN',
    CONNECTION_CLOSE: 'CONNECTION_CLOSE',

    CONNECTION_ATTACH: 'CONNECTION_ATTACH',
    CONNECTION_DETACH: 'CONNECTION_DETACH',
};

export const StateEvents = {
    Connection: {
        ATTACH: "state.connection.attach",
        DETACH: "state.connection.detach"
    }
};