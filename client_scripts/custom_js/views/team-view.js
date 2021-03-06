const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
import Validation from 'react-validation';
import Select from 'react-select';
import Ink from 'react-ink';
import {FocusableInput} from './custom_components';

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
	inviteUser: function(email){
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
		console.log("TeamContainer ",this.props);
		return (
			<div>
			<InviteTeamMember  inviteUserFunc = {this.inviteUser}></InviteTeamMember>
			<TeamMembers team_members = {this.props.user_state.users}/>
			</div>
		);
	},
	
});

const InviteTeamMember = React.createClass({
	getInitialState:function(){
		return {email_error_element:"invisible", invite_email:""};
	},
	updateInviteEmail: function(e){
		const email = e.target.value;
		console.log(email);
		if(!utils.is_email(email)){
			this.setState({
				email_error_element:"", invite_email:""
			});
			setTimeout(this.clearWarnings, 5000);
			return;
		}
		this.setState(utils.updateReactState(this.state, {invite_email:email}));
	},
	clearWarnings: function(){
		this.setState(utils.updateReactState(this.state, {email_error_element:"invisible"}));
	},
	validateAndInviteUser: function(){
		const email = this.state.invite_email;
		if(!this.state.invite_email){
			this.setState({
				email_error_element:"", invite_email:""
			});
			setTimeout(this.clearWarnings, 5000);
			return;
		}
		this.setState({email_error_element:"hidden", invite_email:""});
		this.props.inviteUserFunc(this.state.invite_email);
	},
	render: function(){
		return (
			<center>
			<div className="invite_user_container">
				<div><button className="invite_user_btn btn btn-primary" 
				onClick = {this.validateAndInviteUser}>
					Click here to invite user<Ink/></button></div>
				<div>
					<FocusableInput input_class="invite_user" value = {this.state.invite_email} 
					onBlur = {this.updateInviteEmail} is_controlled = {true} placeholder="Email"/>
					<span className={this.state.email_error_element + " input_error"}>Invalid email</span>
				</div>
			</div>
			</center>
		);
	}
});

const TeamMembers = React.createClass({
	componentWillMount: function(){
	},
	componentDidMount:function(){
	},
	render: function(){
		return(
		<div>
			<div className="card">
			<div className="card-header" data-background-color="purple">
				<h4 className = "title">Team Members</h4>
			</div>
			<div className="card-content table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th>Email</th>
							<th>First name</th>
							<th>Last name</th>
						</tr>
					</thead>
					<tbody>{this.props.team_members.map(this.renderMember)}</tbody>
				</table>
			</div>
			</div>
		</div>
		);
	},

	renderMember: function(team_member){
		let firstname, lastname;
		if(team_member.status === "joined"){
			[firstname, lastname] =[team_member.firstname, team_member.lastname];
		}
		else{
			[firstname, lastname] = ["(Invited)", "(Invited)"];
		}
		return (
				<tr>
					<td>{team_member.email}</td>
					<td>{firstname}</td>
					<td>{lastname}</td>
				</tr>
				);
	}
});

module.exports = TeamContainer;