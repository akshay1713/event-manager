
const initialTeamState = {
	users:[]
};

const initialEventState = {
	events:[],
	current_tasks:[],
	current_event_id:null
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
	else if (action.type === "UPDATE_CURRENT_TASKS"){
		events_state.current_tasks = action.tasks;
		events_state.current_event_id = action.event_id;
	}
	else if (action.type === "CREATE_TASK"){
		events_state.current_tasks = events_state.current_tasks.concat(action.tasks);
	}
	else if (action.type === "ASSIGN_TASK"){
		events_state.current_tasks.some((task) => {
			if(task.id === action.task_details.taskid){
				task.userid = action.task_details.userid
				return true;
			}
		})
	}
	else if (action.type === "CHANGE_TASK_STATUS"){
		events_state.current_tasks.some((task) => {
			if(task.id === action.task_details.taskid){
				task.status = action.task_details.status
				return true;
			}
		})
	}
	else if (action.type === "CREATE_FORM"){
		events_state.events.some((event) => {
			 if(event.id === action.eventid){
				 event.form_created = true;
			 }
		});
	}
	return events_state;
}

const combined_reducers = Redux.combineReducers({
	teamState: team_members_reducer,
	eventState: events_reducer
});

const combinedStore = Redux.createStore(combined_reducers);

