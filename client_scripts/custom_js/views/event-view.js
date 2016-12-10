const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
const TicketTypes = require('./ticket_types-view.js');
const DateTime = require("react-datetime");
const moment = require('moment');
import Ink from 'react-ink';


const EventsContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
		console.log("received next props ",next_props);
		this.setState({createEventForm:true,createEventHidden:true});
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
		let state = this.state;
		this.state.is_disabled = "disabled";
		this.setState(state);
		utils.ajax({
			url:"/events/create_event",
			data:{event_name, ticket_types, event_start, event_end, venue},
			method:"POST",
			callback: (response) => {
				if(response.length>0){
					// combinedStore.dispatch({
					// 	type:"CREATE_EVENT",
					// 	events:response
					// });
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
		console.log("event props are ",this.props," event state is ",this.state);
		return (
			<div>		
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
			},
			form_error_elements:{
				"event_name":"invisible",
				"ticket_types":"invisible",
				"event_type":"invisible"
			},
			is_disabled:false
		};
	},
	collectEventDataAndCreate: function(){
		let is_invalid = false;
		let state = this.state;
		const event_name = document.getElementById("event_name").value;
		if(!event_name){
			state.form_error_elements.event_name = "";
			is_invalid = true;
		}
		let ticket_types = [];
		const ticket_types_rows = document.querySelectorAll(".create_ticket_types tbody tr");
		ticket_types_rows.forEach((row) => {
			let ticket_type = {};
			ticket_type.name = row.querySelector(".ticket_name").value;
			ticket_type.maximum_available = row.querySelector(".max_per_person").value;
			ticket_type.max_per_person = row.querySelector(".max_per_person").value;
			if(!ticket_type.name || !ticket_type.maximum_available || !ticket_type.max_per_person){
				state.form_error_elements.ticket_types = "";
				is_invalid = true;
			}
			ticket_types.push(ticket_type);
		});
		let date_obj = new Date(this.state.eventStartDate.toString());
		const event_start = moment(date_obj.toUTCString()).format('YYYY-MM-DD hh:mm:ss');
		date_obj = new Date(this.state.eventEndDate.toString());
		const event_end = moment(date_obj.toUTCString()).format('YYYY-MM-DD hh:mm:ss');
		const venue = this.state.event_venue;
		if(!venue && state.event_type === "real_world"){
			state.form_error_elements.event_type = "";
			is_invalid = true;
		}
		if(is_invalid){
			this.setState(state);
			setTimeout(this.clearWarnings,5000);
			return;
		}
		this.props.createEvent(event_name, ticket_types, event_start, event_end, venue);
	},
	clearWarnings:function(){
		console.log("clearing warnings");
		let state = this.state;
		Object.keys(state.form_error_elements).forEach((error_element)=>{
			state.form_error_elements[error_element] = "invisible";
		});
		this.setState(state);
		return;
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
		let venue_class_name = (this.state.event_type === "real_world") ? "" : "invisible";
		return (
			<div>
				<div className="text-center">
					<button onClick = {()=>{this.props.toggleCreateEvent()}} className="btn btn-primary">
					{btn_text}
						<Ink />
					</button>
				</div>
			<div className = {create_class_name + " card"}>
			<div className="card-header" data-background-color="purple">
				<h4 className = "title">Event Details</h4>
				<p className = "category">Enter event details</p>
			</div>
			<div className = "card-content">
			<fieldset disabled = {this.state.is_disabled}>
				<div>
				<div className="display_inline_block event_name_container">
				<div className = {this.state.form_elements_focused["event_name"] + " no_margin form-group event_name"} 
				onClick = {()=>{this.updateFocusedElement("event_name")}} onBlur = {this.clearFocusedElement}>
				<input type = "text" id = "event_name" className="form-control" placeholder="Event Name"></input>
				<span className="material-input"></span>
				</div><br/>
				<span className={this.state.form_error_elements["event_name"] + " input_error"}>Event name is required</span>
				</div>
				<label className="event_date_label valign_top">Event starts on: </label>
				<DateTime onChange = {this.updateEventStartDate} value = {this.state.eventStartDate} className="valign_top"/>
				<label className="event_date_label valign_top">Event ends on: </label><DateTime className="valign_top" onChange = {this.updateEventEndDate} value = {this.state.eventEndDate}/>
				</div>
				<div className = "ticket_types_container">
				<TicketTypes total_ticket_types = {4}/>
				<span className={this.state.form_error_elements["ticket_types"] + " input_error"}>At least one type is required (All fields are mandatory for a single ticket type. You can change them later)</span>
				</div>
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
				<div className = {venue_class_name}>
				<div className = {this.state.form_elements_focused["event_venue"] + " form-group no_margin "} 
				onClick = {()=>{this.updateFocusedElement("event_venue")}} onBlur = {this.clearFocusedElement}>
				<textarea id = "event_name" className="form-control" cols="50" rows="3" placeholder="Event Venue" 
				onBlur={this.updateEventVenue}></textarea>
				<span className="material-input"></span>
				</div>
				<span className={this.state.form_error_elements["event_type"] + " input_error"}>Venue is required for real world events. You can change it later</span>
				</div>
				</div>
				{/*<EventDescription className = "event_description" content = {this.state.event_description} onChange = {this.updateEventDescription}/>*/}
				<div className="text-center">
					<button  className="btn btn-primary no_margin" onClick={this.collectEventDataAndCreate}>Create Event!
						<Ink/>
					</button>
				</div>
			</fieldset>
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
