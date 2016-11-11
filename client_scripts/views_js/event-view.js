const EventContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
		console.log(next_props);
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
	render: function(){
		//console.log("TeamContainer ",this.props);
		return (
			<div>
			<h1>Events Page </h1>
			<CreateEvent  createEventFunc = {this.createEvent}></CreateEvent>
			<EventsList events = {this.props.events_state.events}/>
			</div>
		);
	},
	
});

const CreateEvent = React.createClass({

	render: function(){
		//console.log(this.props);
		return (
			<div>
				<div><input type = "text" id = "event_name"></input></div>
				<div><a href = "javascript:;" onClick = {this.props.createEventFunc.bind(this)}>Click here to create event</a></div>
			</div>
		);
	}
});

const EventsList = React.createClass({
	componentWillMount: function(){
		//console.log("TeamMembers componentWillMount ",this.props);
	},

	componentDidMount:function(){
		//console.log("TeamMembers ",this.props);
	},

	render: function(){
		return <ul>{this.props.events.map(this.renderEvent)}</ul>
	},

	renderEvent: function(event){
		return <li>{event.name} ({event.date})</li>
	}
});
