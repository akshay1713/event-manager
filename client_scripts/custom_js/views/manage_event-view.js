const React = require('react');
const utils = require('../utils.js');
const DateTime = require('react-datetime');
const combinedStore = require('../redux_state_manager.js');
const TicketTypes = require('./ticket_types-view.js');
import Ink from 'react-ink';
import FocusableInput from './custom_components';
import Select from 'react-select';

const ManageEventContainer = React.createClass({
    componentWillMount: function(){},
    componentDidMount: function(){
		const event_id = utils.getUrlParameter("event_id");
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
	createTicket: function(event_id){
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
			ticket_type.eventid = event_id;
			ticket_types.push(ticket_type);
		});;
		utils.ajax({
			url:"/events/add_ticket/"+event_id,
			method:"POST",
			data:{ticket_types},
			callback:(response) => {
				let created_ticket_types = [];
				ticket_types.forEach((type) => {
					created_ticket_types.push({
						ticket_name:type.ticket_name, 
						maximum_available:type.maximum_available,
						booked:0
					});
				});
				combinedStore.dispatch({
					type:"CREATE_TICKET",
					tickets:created_ticket_types
				});
			}
		});
	},
	createTask: function(task_name, event_id){
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
	assignTaskToUser:function(taskid, userid){
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
	changeTaskStatus:function(taskid, status){
		utils.ajax({
			url:"/events/change_task_status/"+taskid,
			method:"POST",
			data:{status},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CHANGE_TASK_STATUS",
					task_details:{taskid, status}
				});
			}
		});
	},
	render: function(){
		return (
			<div>
			<SelectedEventTasks tasks = {this.props.current_event_state.tasks} event_id ={this.props.current_event_state.event_id} 
			createTask = {this.createTask} users = {this.props.user_state.users} assignTaskToUser = {this.assignTaskToUser} 
			changeTaskStatus = {this.changeTaskStatus}/>
			<Tickets tickets = {this.props.current_event_state.tickets} event_id = {this.props.current_event_state.event_id}
			createTicket = {this.createTicket}/>
			</div>
			);
	}
});

const Tickets = React.createClass({
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(next_props){
	},
	getInitialState: function(){
		return {addMoreTickets:false}
	},
	toggleAddMoreTickets: function(){
		this.setState({addMoreTickets: !this.state.addMoreTickets});
	},
	render: function(){
		let add_tickets_class = "hidden", add_tickets_text = "Add More Tickets";
		if(this.state.addMoreTickets){
			add_tickets_class = "";
			add_tickets_text = "Not Now";
		}
		return (
			<div className="event_tickets_container">
			<div className="card">
				<div className="card-header" data-background-color="purple">
					<h4 className = "title">Tickets</h4>
				</div>
				<div className="card-content table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Maximum Available</th>
								<th>Booked</th>
							</tr>
						</thead>
						<tbody>{this.props.tickets.map(this.renderTicket)}</tbody>
					</table>
				</div>
			</div>
			<div className="add_tickets_container">
				<button onClick = {this.toggleAddMoreTickets} className="add_tickets_btn btn btn-primary">{add_tickets_text}<Ink/></button>
				<div className = {add_tickets_class+" new_tickets_container"}>
					<TicketTypes ticket_types_count={4}/>
					<div><button onClick = {()=>{this.props.createTicket(this.props.event_id)}} className="btn btn-primary">Add Tickets<Ink/></button></div>
				</div>
				</div>
			</div>
		);
	},
	renderTicket: function(ticket){
		return (
			<tr key={ticket.id}>
				<td>{ticket.name}</td>
				<td>{ticket.maximum_available}</td>
				<td>{ticket.booked}</td>
			</tr>
		);
	}
});

const SelectedEventTasks = React.createClass({
	getInitialState:function(){
		return {task_name:""}
	},
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(){
		// console.log("update nahi hua");
		this.setState({task_name:""});
	},
	updateTaskName:function(e){
		this.setState({task_name:e.target.value});
	},
	getTaskNameAndCreate:function(){
		const task_name = this.state.task_name;
		const event_id = this.props.event_id;
		this.props.createTask(task_name, event_id);
		this.setState({task_name:""});
	},
	render: function(){
		// console.log("task name should be ",this.state.task_name);
		return (
			<div className="event_tasks_container">
			<div className="card">
				<div className="card-header" data-background-color="purple">
					<h4 className = "title">Tasks</h4>
				</div>
				<div className="card-content table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Assigned to</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>{this.props.tasks.map(this.renderTask)}</tbody>
					</table>
				</div>
			</div>
			<div className="create_task_container">
				<FocusableInput input_class="create_task" value = {this.state.task_name} value={this.state.task_name}
					onBlur = {this.updateTaskName} is_controlled = {true} placeholder="Task name"/>
			<div><button onClick = {this.getTaskNameAndCreate} className="btn btn-primary">
			Create a new task</button></div>
			</div>
			</div>
		);
	},
	renderTask: function(task){
		const assign_options = [];
		const users = this.props.users;
		users.forEach((user) => {
			const name_or_email = (user.is_active) ? user.firstname + user.lastname : user.email;
			assign_options.push({label: name_or_email, value: user.id});
		});
		assign_options.push({value:-1, label:"Unassigned"});
		const assigned_userid = (!task.userid) ? -1 : task.userid;
		const is_unassigned = (!task.userid) ? true : false;
		const status = (task.status === "pending") ? "pending" : "done";
		const status_options = [{label:"Done", value:"done"}, {label:"Pending", value:"pending"}];
		return (
			<tr key={task.id}>
			<td>
				{task.name} 
			</td>
			<td>
				<Select
					name="assign_users_dropdown"
					value={assigned_userid}
					options={assign_options}
					onChange={(option) => {this.props.assignTaskToUser(task.id, option.value)}}
				/>
			</td>
			<td>
				<Select
					name="change_status_dropdown"
					value={status}
					options={status_options}
					onChange={(option) => {this.props.changeTaskStatus(task.id, option.value)}}
				/>
			</td>
			</tr>
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

module.exports = ManageEventContainer;