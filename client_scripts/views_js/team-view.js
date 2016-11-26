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
