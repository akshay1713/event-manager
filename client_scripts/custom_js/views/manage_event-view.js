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
		const tickets = this.props.tickets;
		const selected_ticket = tickets.find(ticket => ticket.id === ticketid);
		const selected_ticket_attendees = this.props.attendees.filter(attendee => attendee.ticketid === ticketid);
		this.setState(utils.updateReactState(this.state, {show_ticket_attendees:true, selected_ticket_attendees}));
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
	getInitialState: function(){
		return {
			open_attendee_ids: []
		}
	},
	render: function(){
		if(!this.props.show_ticket_attendees){
			return null;
		}
		let attendee_extra_data = [];
		let attendee_rows = [];
		const attendees = this.props.attendees;
		attendees.map(attendee => attendee_rows.push(this.renderAttendee(attendee)));
		const extra_keys = Object.keys(attendees[0].extra_data);
		extra_keys.map(key => attendee_extra_data.push(<div className="attendee_cell attendee_extra_data">{key}</div>))
		return(
			<div className="attendee_details">
				<Modal
				closeOnOuterClick={true}
				show={this.props.show_ticket_attendees}>
				<a key="close" style={closeStyle} onClick={this.props.closeAttendeesModal}>X</a>
				<div className="attendee_table">
					<div className="attendee_row">
						<div className="attendee_cell">Name</div>
						<div className="attendee_cell">Email</div>
						<div className="attendee_cell">Quantity</div>
						<div className="attendee_cell">Order Id</div>
						{attendee_extra_data}
					</div>
					{attendee_rows}
				</div>
				</Modal>
			</div>
		);
	},
	toggleExtraDataRow: function(attendee_id){
		const open_attendee_ids = this.state.open_attendee_ids;
		const current_position = open_attendee_ids.indexOf(attendee_id);
		if(current_position !== -1){
			open_attendee_ids.splice(current_position,1);
		}
		else{
			open_attendee_ids.push(attendee_id);
		}
		this.setState(open_attendee_ids);
	},
	renderAttendee: function(attendee){
		const attendee_extra_data = attendee.extra_data;
		let param_keys = [], param_values = [];
		Object.keys(attendee_extra_data).forEach(key => {
			param_keys.push(<div className="attendee_cell">{key}</div>);
			param_values.push(<div className="attendee_cell attendee_extra_data">{attendee_extra_data[key]}</div>);
		});
		return(
			<div className = "attendee_row">
				<div className="attendee_cell">{attendee.firstname} {attendee.lastname}</div>
				<div className="attendee_cell">{attendee.email}</div>
				<div className="attendee_cell">{attendee.quantity}</div>
				<div className="attendee_cell">{attendee._id}</div>
				{param_values}
			</div>
		);
	},
	renderAttendeeExtraData: function(attendee_extra_data, is_hidden){
		const display_class = (is_hidden) ? "hidden" : "";
		let param_keys = [], param_values = [];
		Object.keys(attendee_extra_data).forEach(key => {
			param_values.push(<div className="attendee_cell attendee_extra_data">{attendee_extra_data[key]}</div>);
		});
		return(
			{param_values}
		);
	}
});

const AttendeeMandatoryDetails = React.createClass({
	render: function(){
		const attendee = this.props.attendee;
		return(
			<div>
				<div className="attendee_cell">{attendee.firstname} {attendee.lastname}</div>
				<div className="attendee_cell">{attendee.email}</div>
				<div className="attendee_cell">{attendee.quantity}</div>
				<div className="attendee_cell">{attendee._id}</div>
				<div className="attendee_cell" onClick = {e => this.props.toggleExtraDataRow(attendee._id)}>View extra data</div>
			</div>
		);
	}
});

const AttendeeExtraData = React.createClass({
	render: function(){
		const attendee_extra_data = this.props.attendee_extra_data;
		const is_hidden = this.props.is_hidden;
		const display_class = (is_hidden) ? "hidden" : "";
		let param_keys = [], param_values = [];
		Object.keys(attendee_extra_data).forEach(key => {
			param_keys.push(<div className="attendee_cell">{key}</div>);
			param_values.push(<div className="attendee_cell">{attendee_extra_data[key]}</div>);
		});
		return(
			<div>
			{param_values}
			</div>
		);
	}
})

module.exports = ManageEventContainer;
