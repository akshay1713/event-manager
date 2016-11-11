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
		console.log(next_props);
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

//console.log(window.ReactRedux);

const initialTeamState = {
	users:[]
};

const initialEventState = {
	events:[]
};

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
	console.log(events_state,action);
	return events_state;
}

const combined_reducers = Redux.combineReducers({
	teamState: team_members_reducer,
	eventState: events_reducer
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
let ApplicationState = {
	location: window.location.hash
};

let target = document.getElementById("wrapper");

const Provider = ReactRedux.Provider;
console.log(Provider);

ReactDOM.render(
      <MainApp test="val" />,
      target
    );
combinedStore.subscribe(() => {
	set_application_state(window.location.hash)
});
const set_application_state = function(state_changes){
	Object.assign(ApplicationState,state_changes);
	const target_content = document.getElementById("page-wrapper");
	switch (ApplicationState.location){
		case "#/team":
			ReactDOM.render(
					<TeamContainer user_state = {combinedStore.getState().teamState}/>,
				target_content
			);
			break;
		case "#/events":
			ReactDOM.render(
				<EventContainer events_state = {combinedStore.getState().eventState}/>,
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

const navigated = function(){
	set_application_state({location:window.location.hash});
};

window.addEventListener('hashchange', navigated, false);
navigated();
})();