import React from "react";
// import utils from "./utils";

export const SuccessfulRegistration = React.createClass({
    render:function(){
        return(
            <div>
                <div>You have successfully registered for the event {this.props.event_name}</div>
                <div>Your order id is {this.props.order_id}. Please save it.</div>
                <div>Tickets booked: {this.props.quantity}</div>
            </div>
        );
    }
});
export const UnsuccessfulRegistration = React.createClass({
    render:function(){
        return(
            <div>
                Sorry, your registration could not be completed. Please try again later.
            </div>
        );
    }
});

