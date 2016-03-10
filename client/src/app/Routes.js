import React            from "react"
import ReactRouter, {
    Route,
    Router,
    IndexRoute,
    NotFoundRoute,
    Redirect,
    HashLocation,
    RouteHandler }      from "react-router"

import {
    PlayerModes
}                       from "./Constants";

import * as SessionActionCreators   from "./actions/session";
import * as PlayerActionCreators    from "./actions/player";

import Shell            from "./components/Shell";

import PageDashboard    from "./pages/Dashboard";

import PageUsersIndex   from "./pages/users/Index";
import PageUsersProfile from "./pages/users/Profile";
import PageUsersDetails from "./pages/users/Details";

import PageRoomsIndex   from "./pages/rooms/Index";
import PageRoomsDetails from "./pages/rooms/Details";

/******************************************/

export default function createRoutes() {
    return (
        <Router>
            <Route path="/" component={Shell}>
                <IndexRoute component={PageDashboard}/>

                {/* Users */}
                <Route path="users">
                    <IndexRoute component={PageUsersIndex} />
                    <Route path="profile" component={PageUsersProfile}/>
                    <Route path=":userEncodedId" component={PageUsersDetails}/>
                </Route>

                {/* Rooms */}
                <Route path="rooms">
                    <IndexRoute component={PageRoomsIndex} />
                    <Route path="id-:roomEncodedId" component={PageRoomsDetails} />
                    <Route path=":roomSlug" component={PageRoomsDetails} />
                </Route>
            </Route>
        </Router>
    );
}