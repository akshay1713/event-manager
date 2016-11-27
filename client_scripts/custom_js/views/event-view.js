const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');

const EventsContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
		console.log("new props are ",next_props );
	},
	getInitialState: function(){
		return {createEventForm:true};
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
	createEvent: function(event_name){
		utils.ajax({
			url:"/events/create_event",
			data:{event_name},
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
			<h1>Events Page </h1>
			<CreateEvent  createEvent = {this.createEvent} createEventHidden = {this.props.createEventHidden}></CreateEvent>
			<EventsList events = {this.props.events_state.events} expandEvent = {this.expandEvent} createEventForm = {this.createEventForm}/>
			</div>
		);
	},
	
});

const CreateEvent = React.createClass({
	getInitialState: function(){
		return {createEventHidden: true};
	},
	toggleCreateEvent: function(){
		this.setState({createEventHidden: !this.state.createEventHidden});
	},
	collectEventDataAndCreate: function(){
		const event_name = document.getElementById("event_name").value;
			
	},
	render: function(){
		let btn_text, class_name;
		if(this.state.createEventHidden){
			btn_text = "Create a new Event";
			class_name = "hidden";
		}
		else{
			btn_text = "Maybe Later";
			class_name = "";
		}
		return (
			<div>
			<button onClick = {this.toggleCreateEvent}>{btn_text}</button>
			<div className = {class_name}>
				<div><input type = "text" id = "event_name"></input></div>
				<div><a href = "javascript:;" onClick = {this.props.createEvent}>Click here to create event</a></div>
			</div>
			</div>
		);
	}
});

const EventsList = React.createClass({
	render: function(){
		return <ul>{this.props.events.map(this.renderEvent)}</ul>
	},
	renderEvent: function(event){

		return (<li><span onClick = {()=>this.props.expandEvent(event.id)}>{event.name}</span> &nbsp;
		<span onClick = {()=>this.props.createEventForm(event.id)}>Create Registration Form</span></li>)
	}
});

module.exports = EventsContainer;
