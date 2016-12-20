
const ReactDOM = require('react-dom');
const React = require('react');
const combinedStore = require('./redux_state_manager.js');
const MainApp = require('./views/navbar-view.js');
const HomePage = require('./views/home-view.js');
const TeamContainer = require('./views/team-view.js');
const EventsContainer = require('./views/event-view.js');
const ManageEventContainer = require('./views/manage_event-view.js');
const EventForm = require('./views/event_form-view');
let ApplicationState = require('./application_state.js');
let target = document.getElementById("em_wrapper");

ReactDOM.render(
      <MainApp/>,
      target
    );
combinedStore.subscribe(() => {
	set_application_state(ApplicationState);
});

const set_application_state = (state_changes) => {
	Object.assign(ApplicationState,state_changes);
	const target_content = document.getElementById("em_page_wrapper");
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
		case "create_form":
			ReactDOM.render(
				<EventForm fields = {combinedStore.getState().formFieldState.fields}/>,
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

window.addEventListener('hashchange', navigated, false);
navigated();

