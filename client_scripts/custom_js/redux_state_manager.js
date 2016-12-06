const Redux = require('redux');

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
};

const initialFormElementState = {
	fields:[]
};

const form_elements_reducer = (state = initialFormElementState, action) => {
	let fe_state = state;
	if(action.type === "UPDATE_FORM_FIELDS"){
		fe_state.fields = action.fields;
	}
	else if(action.type === "ADD_FORM_ELEMENTS"){
		fe_state.fields = fe_state.fields.concat(action.fields);
	}
	return fe_state;
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
	currentEventState: current_events_reducer,
	formFieldState: form_elements_reducer
});

const combinedStore = Redux.createStore(combined_reducers);

module.exports = combinedStore;