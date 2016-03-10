import React                from "react";

export default function RoomDetailsView(props) {

    if (props.isLoading) {
        return (
            <div> ---- TODO | Loading | TODO ---- </div>
        )
    }

    let room = props.room;
    if (!room) {
        return (
            <div> ---- TODO | 404 | TODO ---- </div>
        );
    }

    return (
        <div className="c-room-details-view">
            <h3>TODO: Room Details</h3>
            <ul>
                <li><strong>ID:</strong> {room.id}</li>
                <li><strong>Name:</strong> {room.name}</li>
                <li>
                    <strong>Summary:</strong>
                    <div>
                        {room.summary}
                    </div>
                </li>
            </ul>
        </div>
    );

}