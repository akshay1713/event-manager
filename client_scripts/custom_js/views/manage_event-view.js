const React = require('react');
const utils = require('../utils.js');
const DateTime = require('react-datetime');
const combinedStore = require('../redux_state_manager.js');
const TicketTypes = require('./ticket_types-view.js');
import Ink from 'react-ink';
import {FocusableInput, FocusableTextArea} from './custom_components';
import Select from 'react-select';
import Modal, {closeStyle} from 'simple-react-modal'


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
					attendees:response.attendees,
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
	createTask: function(task_name, task_description, event_id){
		utils.ajax({
			url:"/events/create_task/"+event_id,
			method:"POST",
			data:{task_name, task_description},
			callback:(response) => {
				combinedStore.dispatch({
					type:"CREATE_TASK",
					tasks:[{name: task_name, id: response[0], status: "pending", userid: null, 
					last_userid:null, description:task_description}]
				});
			}
		});
	},
	assignTaskToUser: function(taskid, userid){
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
			createTicket = {this.createTicket} attendees = {this.props.current_event_state.attendees}/>
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
		return {addMoreTickets:false, show_ticket_attendees:false, selected_ticket_attendees:[]}
	},
	toggleAddMoreTickets: function(){
		this.setState({addMoreTickets: !this.state.addMoreTickets});
	},
	showAttendeesForTicket: function(ticketid){
		console.log("showing ",ticketid);
		const tickets = this.props.tickets;
		const selected_ticket = tickets.find(ticket => ticket.id === ticketid);
		const selected_ticket_attendees = this.props.attendees.filter(attendee => attendee.ticketid === ticketid);
		this.setState(utils.updateReactState(this.state, {show_ticket_attendees:true, selected_ticket_attendees}));
		console.log(selected_ticket_attendees);
	},
	closeAttendeesModal: function(){
		this.setState(utils.updateReactState(this.state, {show_ticket_attendees:false, selected_ticket_attendees:[]}));
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
			<TicketAttendees show_ticket_attendees = {this.state.show_ticket_attendees} 
			attendees = {this.state.selected_ticket_attendees}/>
			<div className="add_tickets_container">
				<button onClick = {this.toggleAddMoreTickets} className="add_tickets_btn btn btn-primary">
				{add_tickets_text}<Ink/></button>
				<div className = {add_tickets_class+" new_tickets_container"}>
					<TicketTypes ticket_types_count={4}/>
					<div><button onClick = {()=>{this.props.createTicket(this.props.event_id)}} className="btn btn-primary">
					Add Tickets<Ink/></button></div>
				</div>
				</div>
			</div>
		);
	},
	renderTicket: function(ticket){
		return (
			<tr key={ticket.id}>
				<td>
					<span onClick = { e => {this.showAttendeesForTicket(ticket.id)}}>
					{ticket.name}
					</span>
				</td>
				<td>{ticket.maximum_available}</td>
				<td>{ticket.booked}</td>
			</tr>
		);
	}
});

const SelectedEventTasks = React.createClass({
	getInitialState:function(){
		return {task_name:"", task_description:"", show_task:"", last_user_name:"", task_name:""}
	},
	componentDidMount: function(){
	},
	componentWillReceiveProps:function(){
		this.setState({task_name:"", task_description:""});
	},
	updateTaskName:function(e){
		const task_name = e.target.value;
		this.setState(utils.updateReactState(this.state, {task_name}));
	},
	updateTaskDescription:function(e){
		const task_description = e.target.value;
		this.setState(utils.updateReactState(this.state, {task_description}));
	},
	getTaskDetailsAndCreate:function(){
		const task_name = this.state.task_name;
		const task_description = this.state.task_description;
		const event_id = this.props.event_id;
		this.props.createTask(task_name, task_description, event_id);
		this.setState({task_name:"", task_description:""});
	},
	showTaskModal:function(last_userid, description, task_name){
		const show_task = true;
		const user = this.props.users.find(user => user.id === last_userid);
		const last_user_name = user.firstname + " " + user.lastname;
		this.setState(utils.updateReactState(this.state, {show_task, last_user_name, description, task_name}));
	},
	closeTaskModal:function(){
		const show_task = false, last_user_name = "", description = "";
		this.setState(utils.updateReactState(this.state, {show_task, last_user_name, description}));
	},
	render: function(){
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
					<FocusableInput input_class="create_task" value = {this.state.task_name}
					onBlur = {this.updateTaskName} is_controlled = {true} placeholder="Task name"/>
					<FocusableTextArea input_class="task_description" 
					value = {this.state.task_description}
					onBlur = {this.updateTaskDescription} is_controlled = {true} 
					placeholder="Task Description"/>
					<div>
						<button onClick = {this.getTaskDetailsAndCreate} className="btn btn-primary">
						Create a new task</button>
					</div>
				</div>
				<TaskDetails show_task = {this.state.show_task} last_user_name = {this.state.last_user_name} 
				description = {this.state.description} closeTaskModal = {this.closeTaskModal} 
				task_name = {this.state.task_name}/>
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
				<span className="task_name" onClick = {(e) => {this.showTaskModal(task.last_userid, task.description, task.name)}}>
					{task.name} 
				</span>
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

const TaskDetails = React.createClass({
	render: function(){
		return(
			<div className = "task_details_modal">
				<Modal
				closeOnOuterClick={true}
				show={this.props.show_task}>
				<a key="close" style={closeStyle} onClick={this.props.closeTaskModal}>X</a>
				<div key="content">Task Name: {this.props.task_name} <br/>Last Updated By: {this.props.last_user_name}
				<br/>Description: {this.props.description}</div>
				</Modal>
			</div>
		);
	}
});

const TicketAttendees = React.createClass({
	render: function(){
		return(
			<div className="attendee_details">
				<Modal
				closeOnOuterClick={true}
				show={this.props.show_ticket_attendees}>
				<a key="close" style={closeStyle} onClick={this.props.closeAttendeesModal}>X</a>
				<table>
					<thead>
						<tr>
							<td>Name</td>
							<td>Email</td>
							<td>Quantity</td>
							<td>Order Id</td>
						</tr>
					</thead>
					<tbody>
					{this.props.attendees.map(attendee => this.renderAttendee(attendee))}
					</tbody>
				</table>
				</Modal>
			</div>
		);
	},
	renderAttendee: function(attendee){
		return(
			<div>
			<tr>
				<td>{attendee.firstname} {attendee.lastname}</td>
				<td>{attendee.email}</td>
				<td>{attendee.quantity}</td>
				<td>{attendee._id}</td>
			</tr>
			{this.renderAttendeeExtraParams(attendee.extra_data)}
			</div>
		);
	},
	renderAttendeeExtraParams: function(attendee_extra_params){
		let param_keys = [], param_values = [];
		Object.keys(attendee_extra_params).forEach(key => {
			param_keys.push(<td>{key}</td>);
			param_values.push(<td>{attendee_extra_params[key]}</td>);
		});
		return(
			<div>
			<tr>
			{param_keys}
			</tr>
			<tr>
			{param_values}
			</tr>
			</div>
		);
	}
});

module.exports = ManageEventContainer;