const ManageEventContainer = React.createClass({
    componentWillMount: function(){},
    componentDidMount: function(){
		const event_id = getUrlParameter("event_id");
        utils.ajax({
			url:"/events/"+event_id,
			method:"GET",
			callback:(response) => {
				combinedStore.dispatch({
					type:"UPDATE_CURRENT_EVENT",
					tasks:response.tasks,
					tickets:response.tickets,
					event_id
				});
			}
		});
    },
    componentWillReceiveProps: function(next_props){
	},
	createTicket: function(event_id){
		const ticket_name = document.getElementById("ticket_name").value;
		const maximum_available = document.getElementById("maximum_available").value;
		const max_per_person = document.getElementById("max_per_person").value;
		utils.ajax({
			url:"/events/create_ticket/"+event_id,
			method:"POST",
			data:{ticket_name, maximum_available, max_per_person},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CREATE_TICKET",
					tickets:[{name:ticket_name, maximum_available, booked: 0}]
				});
			}
		});
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
					tasks:[{name: task_name, id: response[0], status: "pending", userid: null}]
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
	render: function(){
		console.log("Rendering event data ",this.props);
		return (
			<div>
			<h1>Event Data</h1>
			<Tickets tickets = {this.props.current_event_state.tickets} event_id = {this.props.current_event_state.event_id}
			createTicket = {this.createTicket}/>
			<SelectedEventTasks tasks = {this.props.current_event_state.tasks} event_id ={this.props.current_event_state.event_id} 
			createTask = {this.createTask} users = {this.props.user_state.users} assignTaskToUser = {this.assignTaskToUser} 
			changeTaskStatus = {this.changeTaskStatus}/>
			</div>
			);
	}
});

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
			<div><a href = "javascript:;" onClick = {()=>{this.props.createTask(this.props.event_id)}}>Click here to create task</a></div>
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