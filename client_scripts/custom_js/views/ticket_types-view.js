const React = require("react");

const TicketTypes = React.createClass({
    getInitialState: function(){
        return {ticket_types_count: 1};
    },
    renderCreateTickets: function(e){
		const ticket_types_count = e.target.value;
		this.setState({
			ticket_types_count: parseInt(ticket_types_count)
		});
	},
    render: function(){
        const ticket_types_count = this.state.ticket_types_count;
        let ticket_types_rows = [];
        for (let i = 1; i <= ticket_types_count; ++i){
            ticket_types_rows.push(<tr>
            <td>{" "+i+" "}</td>
            <td><input type = "text" className = "ticket_name"></input> </td>
            <td><input type = "text" className = "maximum_available"></input> </td>
            <td><input type = "text" className = "max_per_person"></input></td>
            </tr>);
        }
        let total_ticket_types_options = [];
        const total_ticket_types = this.props.total_ticket_types;
        for(let i = 1; i <= total_ticket_types; ++i){
            total_ticket_types_options.push(
                <option value = {i.toString()} selected = {i === ticket_types_count}>{i}</option>
            );
        }

        return(
            <div>
                <select onChange = {this.renderCreateTickets}>
					{total_ticket_types_options}
				</select>
                <table id = "create_ticket_types">
                <thead>
                <tr>
                <th>&nbsp;</th>
                <th>&nbsp;Name of ticket type&nbsp;</th>
                <th>&nbsp;Maximum tickets available&nbsp;</th>
                <th>&nbsp;Restrict single attendee to</th>
                </tr>
                </thead>
                <tbody>
                {ticket_types_rows}
                </tbody>
                </table>
            </div>
        );
    }
});

module.exports = TicketTypes;