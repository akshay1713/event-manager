(function(){

//Start of main view template

const MainApp = React.createClass({
    componentWillMount: function(){
        //console.log("component will mount mainapp");
    },    
    componentDidMount: function(){
        //console.log("component did mount mainapp");
    },
    getDefaultProps: function() {
        return ({ test: 'value1' });
    },
    getInitialState: function(){
        let selected = "";
        switch (ApplicationState.location){
            case "#/team": selected = "team";
                        break;
            case "#/events": selected = "events";
                        break;
        }
        return{
            'selected':selected
        };
    },
    setFilter: function(filter){
        this.setState({"selected" : filter});
        switch(filter){
            case "team": 		
                break;
            default:
                break;
        }
    },
    isActive:function(tab_value){
        return (tab_value === this.state.selected) ? "active" : "";
    },
    render: function(){
        return(
        <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html">Event Handler</a>
                    </div>
                    <ul className="nav navbar-right top-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"></i> <b className="caret"></b></a>
                            <ul className="dropdown-menu message-dropdown">
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-footer">
                                    <a href="#">Read All New Messages</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"></i> <b className="caret"></b></a>
                            <ul className="dropdown-menu alert-dropdown">
                                <li>
                                    <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">View All</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> {this.props.test} <b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li className = {this.isActive('team')} onClick = {this.setFilter.bind(this,'team')}>
                                <a href="#/team"><i className="fa fa-fw fa-dashboard"></i> Team</a>
                            </li>
                            <li className = {this.isActive('events')} onClick = {this.setFilter.bind(this,'events')}>
                                <a href="#/events"><i className="fa fa-fw fa-dashboard"></i> Events</a>
                            </li>
                        </ul>
                    </div>
        </nav>
        <div id = "page-wrapper">
        </div>
        </div>
        );
    }
});

//export default MailApp
const HomePage = React.createClass({
	componentWillMount: function(){
		//console.log("component will mount team");
	},
	componentDidMount: function(){
		//console.log("component did mount team");
	},
	render: function(){
		return (
			<h1>Hello </h1>
			);
	}
});
const TeamContainer = React.createClass({
	componentWillMount: function(){
	},
	componentWillReceiveProps: function(next_props){
		// console.log(next_props);
	},
	componentDidMount: function(){
		utils.ajax({
				url:"/team",
				method:"GET",
				callback: (response) => {
					combinedStore.dispatch({
						type:"REFRESH_USERS",
						users:response
					});
				}
			});
	},
	inviteUser: function(){
		const email = document.getElementById("invite_email").value;
		if(!utils.is_email(email)){
			window.alert("Please enter a valid email id");
			return;
		}
		utils.ajax({
			url:"/team/invite_user",
			data:{email:email},
			method:"POST",
			callback: (response) => {
				if(response.status){
					combinedStore.dispatch({
						type:"INVITE_USER",
						users:[{email:email}]
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
			<h1>Team Page </h1>
			<InviteTeamMember  inviteUserFunc = {this.inviteUser}></InviteTeamMember>
			<TeamMembers team_members = {this.props.user_state.users}/>
			</div>
		);
	},
	
});

const InviteTeamMember = React.createClass({

	render: function(){
		//console.log(this.props);
		return (
			<div>
				<div><input type = "text" id = "invite_email"></input></div>
				<div><a href = "javascript:;" onClick = {this.props.inviteUserFunc.bind(this)}>Click here to invite user</a></div>
			</div>
		);
	}
});

const TeamMembers = React.createClass({
	componentWillMount: function(){
		//console.log("TeamMembers componentWillMount ",this.props);
	},

	componentDidMount:function(){
		//console.log("TeamMembers ",this.props);
	},

	render: function(){
		return <ul>{this.props.team_members.map(this.renderMember)}</ul>
	},

	renderMember: function(team_member){
		return <li>{team_member.email} ({team_member.state})</li>
	}
});

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

const initialTeamState = {
	users:[]
};

const initialEventState = {
	events:[],
	current_tasks:[],
	current_event_id:null
};

const initialCurrentEventState = {
	event_id:null,
	tasks:[],
	tickets:[],
	form_created:null
}

const team_members_reducer = (state = initialTeamState,action) => {
	let tm_state = state;
	if(action.type === "INVITE_USER"){
		tm_state.users = tm_state.users.concat(action.users);
	}
	else if (action.type === "REFRESH_USERS"){
		tm_state.users = action.users;
	}
	return tm_state;
};


const events_reducer = (state = initialEventState,action) => {
	let events_state = state;
	if(action.type === "CREATE_EVENT"){
		events_state.events = events_state.events.concat(action.events);
	}
	else if (action.type === "REFRESH_EVENTS"){
		events_state.events = action.events;
	}
	return events_state;
};

const current_events_reducer = (state = initialCurrentEventState, action) => {
	let current_event_state = state;
	if (action.type === "UPDATE_CURRENT_EVENT"){
		current_event_state.tasks = action.tasks;
		current_event_state.tickets = action.tickets;
		current_event_state.event_id = action.event_id;
	}
	else if (action.type === "CREATE_TASK"){
		current_event_state.tasks = current_event_state.tasks.concat(action.tasks);
	}
	else if (action.type === "ASSIGN_TASK"){
		current_event_state.tasks.some((task) => {
			if(task.id === action.task_details.taskid){
				task.userid = action.task_details.userid
				return true;
			}
		})
	}
	else if (action.type === "CHANGE_TASK_STATUS"){
		current_event_state.tasks.some((task) => {
			if(task.id === action.task_details.taskid){
				task.status = action.task_details.status
				return true;
			}
		})
	}
	else if (action.type === "CREATE_TICKET"){
		current_event_state.tickets = current_event_state.tickets.concat(action.tickets);
	}
	else if (action.type === "CREATE_FORM"){
		current_event_state.form_created = true;
	}
	return current_event_state;
};

const combined_reducers = Redux.combineReducers({
	teamState: team_members_reducer,
	eventState: events_reducer,
	currentEventState: current_events_reducer
});

const combinedStore = Redux.createStore(combined_reducers);
const utils = {

	ajax: (ajax_params) => {
		const url = "http://127.0.0.1:1337" + ajax_params.url;
		const method = ajax_params.method ? ajax_params.method : "POST";
		$.ajax({
			url:ajax_params.url,
			data:ajax_params.data,
			method:method,
			dataType:'json'
		}).done(ajax_params.callback);
	},

	is_email: (email) => {
		const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email_regex.test(email);
	}
	
};
window.ApplicationState = {
	location: window.location.hash.replace(/^#\/?|\/$/g,'').split('/')[0],
	params:{}
};

let target = document.getElementById("wrapper");

ReactDOM.render(
      <MainApp test="val" />,
      target
    );
combinedStore.subscribe(() => {
	set_application_state(ApplicationState);
});
const set_application_state = (state_changes) => {
	Object.assign(ApplicationState,state_changes);
	const target_content = document.getElementById("page-wrapper");
	console.log("current location ",ApplicationState.location);
	switch (ApplicationState.location){
		case "team":
			ReactDOM.render(
				<TeamContainer user_state = {combinedStore.getState().teamState}/>,
				target_content
			);
			break;
		case "events":
			ReactDOM.render(
				<EventsContainer events_state = {combinedStore.getState().eventState} 
				user_state = {combinedStore.getState().teamState}/>,
				target_content
			);
			break;
		case "manage_event":
			ReactDOM.render(
				<ManageEventContainer current_event_state = {combinedStore.getState().currentEventState} 
				user_state = {combinedStore.getState().teamState}/>,
				target_content
			);
			break;
		default:
			ReactDOM.render(
				<HomePage/>,
				target_content
			);
	}
};

const navigated = () => {
	const hash_url_data = window.location.hash.replace(/^#\/?|\/$/g,"").split("/");
	const location = hash_url_data[0];
	hash_url_data.shift();
	let params = {};
	for(let i =  0; i < hash_url_data.length; ++i){
		params[hash_url_data[i]] = hash_url_data[++i];
	}
	set_application_state({location,params});
};

const navigateTo = (url,params) => {
	let desired_url = url;
	params.forEach(function(param){
		desired_url += "/" + param.name + "/" + param.value; 
	});
	window.location.hash = desired_url;
};

const getUrlParameter = (param_name) => {
	return ApplicationState.params[param_name];
}

window.addEventListener('hashchange', navigated, false);
navigated();
})();