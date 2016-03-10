// Deps
import React                        from "react";
import { bindActionCreators }       from "redux";
import { connect }                  from "react-redux";

// General
import {
    decodeIdentifier
}                           from "../../Utilities";

// Actions
import * as ActionsRoom     from "../../actions/room";

// Components
import DetailsPage          from "../../components/pages/DetailsPage";
import RoomDetailsView      from "../../components/sections/rooms/RoomDetailsView";

const Details = (props) => {

    // TODO: Wrap this up for re-use
    let slug = props.params.roomSlug;
    let id = props.params.roomEncodedId;

    let identifier = slug
        ? slug
        : decodeIdentifier(id);

    let room = slug
        ? props.rooms.find(x => x.slug === identifier)
        : props.rooms.find(x => x.id === identifier);

    return (
        <DetailsPage
            dispatch={props.dispatch}
            identifier={identifier}
            onLoadData={props.actions.apiUpdateRoom}>

            <RoomDetailsView room={room} isLoading={props.loading[identifier]} />

        </DetailsPage>
    );
};

const mapStateToProps = store => ({
    rooms: store.room.collection,
    loading: store.room.loading
});

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch,
    actions: bindActionCreators({
        apiUpdateRoom: ActionsRoom.apiUpdateRoom,
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);