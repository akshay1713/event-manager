const React = require("react");

const Tickets = React.createClass({
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(next_props){
	},
    createTicket: function(event_id){
		const ticket_name = document.getElementById("ticket_name").value;
		const maximum_available = document.getElementById("maximum_available").value;
		const max_per_person = document.getElementById("max_per_person").value;
		utils.ajax({
			url:"/events/create_ticket/"+event_id,
			method:"POST",
			data:{ticket_name, maximum_available, max_per_person},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CREATE_TICKET",
					tickets:[{name:ticket_name, maximum_available, booked: 0}]
				});
			}
		});
	},
	render: function(){
		return (
			<div>
			<h3>Tickets</h3>
			<div>Ticket name: <input type = "text" id = "ticket_name"></input> <br/>
			Number of tickets to be issued: <input type = "text" id = "maximum_available"></input> <br/>
			Maximum number of tickets to be issued to a single attendee: <input type = "text" id = "max_per_person"></input></div>
			<div><a href = "javascript:;" onClick = {()=>{this.props.createTicket(this.props.event_id)}}>Click here to create a new ticket type</a></div>
				<ul>
					{this.props.tickets.map(this.renderTicket)}
				</ul>
			</div>
		);
	},
	renderTicket: function(ticket){
		return (
			<li>
			<span>Name: {ticket.name}</span> <span>Maximum Available: {ticket.maximum_available}</span> <span> Booked: {ticket.booked}</span> 
			</li>
		);
	}
});