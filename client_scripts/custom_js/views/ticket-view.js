const Tickets = React.createClass({
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(next_props){
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