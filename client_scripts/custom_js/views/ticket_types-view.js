const React = require("react");
import Dropdown from 'react-dropdown';

const FocusableInput = React.createClass({
    getInitialState:function(){
        return {focused_class:""}
    },
    setFocusedState: function(){
        this.setState({focused_class:"is-focused"});
    },
    removeFocusedState: function(){
        this.setState({focused_class:""});
    },
    render:function(){
        const label = (this.props.label_text) ? <label className="control-label">{this.props.label_text}</label> : null;
        return(
            <div className = {this.state.focused_class + " form-group label-floating is-empty"} 
            onClick = {this.setFocusedState} onBlur = {this.removeFocusedState}>
                {label}
                <input type = "text" className={this.props.input_class+ " form-control"}></input>
                <span className="material-input"></span>
            </div>
        );
    }
});

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
            <td><FocusableInput input_class = "ticket_name"/></td>
            <td><FocusableInput input_class = "maximum_available"/></td>
            <td><FocusableInput input_class = "max_per_person"/></td>
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
                <div>
                <label className="ticket_types_label">How many ticket types do you want for your event? Enter details below: </label>
                    <select onChange = {this.renderCreateTickets}>
                        {total_ticket_types_options}
                    </select>
                </div>
                <div className="table-responsive">
                    <table id = "" className = "table create_ticket_types">
                        <thead className="text-primary">
                        <tr>
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
            </div>
        );
    }
});

module.exports = TicketTypes;