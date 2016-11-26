const EventsContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
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
	createEvent: function(){
		const event_name = document.getElementById("event_name").value;
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
					//window.alert("Something went wront. Please try again later");
				}
			}
		});
	},
	expandEvent: function(event_id){
		navigateTo("/manage_event",[{name:"event_id",value:event_id}]);
		// utils.ajax({
		// 	url:"/events/"+event_id,
		// 	method:"GET",
		// 	callback:(response) => {
		// 		combinedStore.dispatch({
		// 			type:"UPDATE_CURRENT_TASKS",
		// 			tasks:response,
		// 			event_id
		// 		});
		// 	}
		// })
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
			<CreateEvent  createEvent = {this.createEvent}></CreateEvent>
			<EventsList events = {this.props.events_state.events} expandEvent = {this.expandEvent} createEventForm = {this.createEventForm}/>
			</div>
		);
	},
	
});

const CreateEvent = React.createClass({

	render: function(){
		return (
			<div>
				<div><input type = "text" id = "event_name"></input></div>
				<div><a href = "javascript:;" onClick = {this.props.createEvent}>Click here to create event</a></div>
			</div>
		);
	}
});

const EventsList = React.createClass({
	componentWillMount: function(){
	},

	componentDidMount:function(){
	},

	render: function(){
		return <ul>{this.props.events.map(this.renderEvent)}</ul>
	},

	renderEvent: function(event){

		return (<li><span onClick = {()=>this.props.expandEvent(event.id)}>{event.name}</span> &nbsp;
		<span onClick = {()=>this.props.createEventForm(event.id)}>Create Registration Form</span></li>)
	}
});
