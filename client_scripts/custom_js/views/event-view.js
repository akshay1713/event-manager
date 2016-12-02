const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
const TicketTypes = require('./ticket_types-view.js');
const DateTime = require("react-datetime");
const moment = require('moment');

const EventsContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
		if(next_props.events_state.events.length > this.props.events_state.events.length){
			this.setState({
				createEventHidden:true,
				createEventForm:true	
			});
		}
	},
	getInitialState: function(){
		return {
			createEventForm:true,
			createEventHidden:true
		};
	},
	componentDidMount: function(){
		utils.ajax({
			url:"/events",
			method:"GET",
			callback: (response) => {
				combinedStore.dispatch({
					type:"REFRESH_EVENTS",
					events:response
				});
			}
		});
	},
	createEvent: function(event_name, ticket_types, event_start, event_end, venue){
		utils.ajax({
			url:"/events/create_event",
			data:{event_name, ticket_types, event_start, event_end, venue},
			method:"POST",
			callback: (response) => {
				if(response.length>0){
					combinedStore.dispatch({
						type:"CREATE_EVENT",
						events:response
					});
				}
				else{
				}
			}
		});
	},
	expandEvent: function(event_id){
		utils.navigateTo("/manage_event",[{name:"event_id",value:event_id}]);
	},
	toggleCreateEvent: function(){
		this.setState({
			createEventHidden: !this.state.createEventHidden, 
			createEventForm: this.state.createEventForm
		});
	},
	createEventForm: function(event_id){
		utils.ajax({
			url:"/events/create_form/"+event_id,
			method:"POST",
			callback:(response) => {
				combinedStore.dispatch({
					type:"CREATE_FORM",
					eventid:event_id
				});
			}
		});
	},
	render: function(){
		return (
			<div>		
			<h1>Events Pages</h1>
			<CreateEvent  createEvent = {this.createEvent} toggleCreateEvent = {this.toggleCreateEvent} 
			createEventHidden = {this.state.createEventHidden}></CreateEvent>
			<EventsList events = {this.props.events_state.events} expandEvent = {this.expandEvent}
			createEventForm = {this.createEventForm} showEventsList = {this.state.createEventHidden}/>
			</div>
		);
	},
	
});

const CreateEvent = React.createClass({
	getInitialState: function(){
		return {
			eventStartDate: moment(),
			eventEndDate: moment(),
			event_type: "real_world",
			event_venue: ""
		};
	},
	collectEventDataAndCreate: function(){
		const event_name = document.getElementById("event_name").value;
		let ticket_types = [];
		const ticket_types_rows = document.querySelectorAll("#create_ticket_types tbody tr");
		ticket_types_rows.forEach((row) => {
			let ticket_type = {};
			ticket_type.name = row.querySelector(".ticket_name").value;
			ticket_type.maximum_available = row.querySelector(".max_per_person").value;
			ticket_type.max_per_person = row.querySelector(".max_per_person").value;
			ticket_types.push(ticket_type);
		});
		let date_obj = new Date(this.state.eventStartDate.toString());
		const event_start = moment(date_obj.toUTCString()).format('YYYY-MM-DD hh:mm:ss');
		date_obj = new Date(this.state.eventEndDate.toString());
		const event_end = moment(date_obj.toUTCString()).format('YYYY-MM-DD hh:mm:ss');
		const venue = this.state.event_venue;
		this.props.createEvent(event_name, ticket_types, event_start, event_end, venue);
	},
	updateEventStartDate: function(date){
		let state = this.state;
		state.eventStartDate = date;
		if(state.eventEndDate < state.eventStartDate){
			state.eventEndDate = state.eventStartDate;
		}
		this.setState(state);
	},
	updateEventEndDate: function(date){
		let state = this.state;
		if(date < state.eventStartDate){ 
			return;
		}
		state.eventEndDate = date;
		this.setState(state);
	},
	updateEventType: function(e){
		let state = this.state;
		state.event_type = e.target.value;
		this.setState(state);
	},
	updateEventVenue: function(e){
		let state = this.state;
		this.state.event_venue = e.target.value;
		this.setState(state);
	},
	render: function(){
		let btn_text, create_class_name;
		if(this.props.createEventHidden){
			btn_text = "Create a new Event";
			create_class_name = "hidden";
		}
		else{
			btn_text = "Maybe Later";
			create_class_name = "";
		}
		let venue_class_name = (this.state.event_type === "real_world") ? "" : "hidden";
		return (
			<div>
			<button onClick = {()=>{this.props.toggleCreateEvent()}}>{btn_text}</button>
			<div className = {create_class_name}>
				<div><input type = "text" id = "event_name"></input></div>
				<TicketTypes total_ticket_types = {4}/>	
				Event starts on: <DateTime onChange = {this.updateEventStartDate} value = {this.state.eventStartDate}/>
				Event ends on: <DateTime onChange = {this.updateEventEndDate} value = {this.state.eventEndDate}/>
				<br/>
				<label><input type = "radio" value = "real_world" checked = 
				{this.state.event_type === "real_world"} onChange = {this.updateEventType}/> Real World</label>
				&nbsp;
				<label><input type = "radio" value = "virtual" checked = 
				{this.state.event_type === "virtual"} onChange = {this.updateEventType}/> Virtual</label>
				<div className = {venue_class_name}>
				<label>Event Venue: <textarea cols = "30" rows = "5" style={{verticalAlign:"top"}} 
				value = {this.state.event_venue} onChange = {this.updateEventVenue}></textarea></label>
				</div>
				<div><a href = "javascript:;" onClick = {this.collectEventDataAndCreate}>Click here to create event</a></div>
			</div>
			</div>
		);
	},
	renderTicketTypes: function(){
	}
});


const EventsList = React.createClass({
	render: function(){
		const create_class_name = (this.props.showEventsList) ? "" : "hidden";
		return <ul className = {create_class_name}>{this.props.events.map(this.renderEvent)}</ul>
	},
	renderEvent: function(event){
		return (<li><span onClick = {()=>this.props.expandEvent(event.id)}>{event.name}</span> &nbsp;
		<span onClick = {()=>this.props.createEventForm(event.id)}>Create Registration Form</span></li>)
	}
});

module.exports = EventsContainer;
