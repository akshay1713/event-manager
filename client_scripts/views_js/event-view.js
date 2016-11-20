const EventContainer = React.createClass({
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
		utils.ajax({
			url:"/events/"+event_id,
			method:"GET",
			callback:(response) => {
				combinedStore.dispatch({
					type:"UPDATE_CURRENT_TASKS",
					tasks:response,
					event_id
				});
			}
		})
	},
	createTask: function(event_id){
		const task_name = document.getElementById("task_name").value;
		utils.ajax({
			url:"/events/create_task/"+event_id,
			method:"POST",
			data:{task_name},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CREATE_TASK",
					tasks:response
				});
			}
		});
	},
	assignTaskToUser:function(taskid,userid){
		utils.ajax({
			url:"/events/assign_task/"+taskid,
			method:"POST",
			data:{userid},
			callback:(response) => {
				combinedStore.dispatch({
					type:"ASSIGN_TASK",
					task_details:{taskid,userid}
				});
			}
		});
	},
	changeTaskStatus:function(taskid,new_status){
		utils.ajax({
			url:"/events/change_task_status/"+taskid,
			method:"POST",
			data:{new_status},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CHANGE_TASK_STATUS",
					task_details:{taskid,new_status}
				});
			}
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
			<h1>Events Page </h1>
			<CreateEvent  createEvent = {this.createEvent}></CreateEvent>
			<EventsList events = {this.props.events_state.events} expandEvent = {this.expandEvent} createEventForm = {this.createEventForm}/>
			<SelectedEventTasks tasks = {this.props.events_state.current_tasks} event_id ={this.props.events_state.current_event_id} 
			createTask = {this.createTask} users = {this.props.user_state.users} assignTaskToUser = {this.assignTaskToUser} 
			changeTaskStatus = {this.changeTaskStatus}/>
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

const SelectedEventTasks = React.createClass({
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(next_props){
	},
	render: function(){
		return (
			<div>
			<h3>Tasks</h3>
			<div><input type = "text" id = "task_name"></input> {this.props.event_id}</div>
			<div><a href = "javascript:;" onClick = {()=>{this.props.createTask(this.props.event_id)}}>Click here to create event</a></div>
				<ul>
					{this.props.tasks.map(this.renderTask)}
				</ul>
			</div>
		);
	},
	renderTask: function(task){
		const is_unassigned = (!task.userid) ? true : false;
		const is_pending = (task.status === "pending") ? true : false; 
		return (
			<li>
			{task.name} 
			<select onChange = {(e) => {this.props.assignTaskToUser(task.id,e.target.value)}}>
			<option value="-1" selected = {is_unassigned}>Unassigned</option>
			{this.props.users.map((user)=>{return this.renderUsersForTask(user,task)})}
			</select>
			<select onChange = {(e) => {this.props.changeTaskStatus(task.id,e.target.value)}}>
			<option value="pending" selected = {is_pending}>Pending</option>
			<option value="done" selected = {!is_pending}>Done</option>
			</select>
			</li>
		);
	},
	renderUsersForTask: function(user,task){
		const name_or_email = (user.is_active) ? user.firstname + user.lastname : user.email;
		const is_assigned = user.id === task.userid;
		return (
			<option value = {user.id} selected = {is_assigned}>{name_or_email}</option>
		);
	}
});