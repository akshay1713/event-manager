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

