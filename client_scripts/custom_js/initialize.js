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