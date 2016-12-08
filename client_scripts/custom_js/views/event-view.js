const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
const TicketTypes = require('./ticket_types-view.js');
const DateTime = require("react-datetime");
const moment = require('moment');
var EventDescription = require('react-wysiwyg-editor');


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
		utils.navigateTo(`/manage_event/event_id/${event_id}`);
	},
	toggleCreateEvent: function(){
		this.setState({
			createEventHidden: !this.state.createEventHidden, 
			createEventForm: this.state.createEventForm
		});
	},
	createEventForm: function(event_id){
		utils.navigateTo(`/create_form/event_id/${event_id}`)
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
			event_venue: "",
			event_description:"",
			focused_element:"",
			form_elements_focused:{
				"event_name":"",
				"event_venue":""
			}
		};
	},
	collectEventDataAndCreate: function(){
		const event_name = document.getElementById("event_name").value;
		let ticket_types = [];
		const ticket_types_rows = document.querySelectorAll(".create_ticket_types tbody tr");
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
	updateEventDescription: function(e){
		let state = this.state;
		state.event_description = e.target.value;
		this.setState(state);
	},
	updateFocusedElement: function(element){
		let state = this.state;
		state.form_elements_focused[state.focused_element] = "",
		state.form_elements_focused[element] = "is-focused";
		state.focused_element = element;
		this.setState(state);
	},
	clearFocusedElement: function(){
		let state = this.state;
		state.focused_element = "";
		Object.keys(state.form_elements_focused).forEach((key) => {
			state.form_elements_focused[key] = "";
		});
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
			<button onClick = {()=>{this.props.toggleCreateEvent()}} className="btn btn-primary text-center">
			{btn_text}
			<div className="ripple-container"></div>
			</button>
			<div className = {create_class_name + " card"}>
			<div className="card-header" data-background-color="purple">
				<h4 className = "title">Event Details</h4>
				<p className = "category">Enter event details</p>
			</div>
			<div className = "card-content">
				<div className = {this.state.form_elements_focused["event_name"] + " form-group label-floating is-empty event_name"} 
				onClick = {()=>{this.updateFocusedElement("event_name")}} onBlur = {this.clearFocusedElement}>
				<label className="control-label">Event Name</label>
				<input type = "text" id = "event_name" className="form-control" ></input>
				<span className="material-input"></span>
				</div>
				<label className="event_date_label">Event starts on: </label>
				<DateTime onChange = {this.updateEventStartDate} value = {this.state.eventStartDate}/>
				<label className="event_date_label">Event ends on: </label><DateTime onChange = {this.updateEventEndDate} value = {this.state.eventEndDate}/>
				<TicketTypes total_ticket_types = {4}/>	
				<br/>
				<div><label>Type of Event:</label></div>
				<div className="event_type_container">
				<div className="event_type_btn_container">
					<label className="event_type_label"><input type = "radio" value = "real_world" checked = 
					{this.state.event_type === "real_world"} onChange = {this.updateEventType}/> Real World</label>
					&nbsp;
					<label className="event_type_label"><input type = "radio" value = "virtual" checked = 
					{this.state.event_type === "virtual"} onChange = {this.updateEventType}/> Virtual</label>
				</div>
				<div className = {this.state.form_elements_focused["event_venue"] + " form-group label-floating is-empty no_margin "+venue_class_name} 
				onClick = {()=>{this.updateFocusedElement("event_venue")}} onBlur = {this.clearFocusedElement}>
				<label className="control-label">Event Venue</label>
				<textarea id = "event_name" className="form-control" cols="30" rows="5"></textarea>
				<span className="material-input"></span>
				</div>
				</div>
				{/*<EventDescription className = "event_description" content = {this.state.event_description} onChange = {this.updateEventDescription}/>*/}
				<div><a href = "javascript:;" onClick = {this.collectEventDataAndCreate}>Click here to create event</a></div>
			</div>
			</div>
			</div>
		);
	}
});


const EventsList = React.createClass({
	render: function(){
		const create_class_name = (this.props.showEventsList || !this.props.events) ? "" : "hidden";
		return (
			<div className={create_class_name+" card"}>
			<div className="card-header" data-background-color="purple">
				<h4 className="title">Events</h4>
				<p className="category">A list of all events created till now</p>
	        </div>
			<div className="card-content table-responsive">
	        	<table className="table">
				<thead className="text-primary">
				<tr>
				<th>Event Name</th>
				<th>Registration Form</th>
				</tr>
				</thead>
				<tbody>
				{this.props.events.map(this.renderEvent)}
				</tbody>
				</table>
			</div>
			</div>
		);
	},
	renderEvent: function(event){
		return (
			<tr>
			<td onClick = {()=>this.props.expandEvent(event.id)}>{event.name}</td>
			<td onClick = {()=>this.props.createEventForm(event.id)}> Create Registration Form</td>
			</tr>
		);
	}
});

module.exports = EventsContainer;
