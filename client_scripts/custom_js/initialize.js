let ApplicationState = {
	location: window.location.hash.replace(/^#\/?|\/$/g,'').split('/')[0],
	params:[]
};

let target = document.getElementById("wrapper");

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
		case "team":
			ReactDOM.render(
					<TeamContainer user_state = {combinedStore.getState().teamState}/>,
				target_content
			);
			break;
		case "events":
			ReactDOM.render(
				<EventContainer events_state = {combinedStore.getState().eventState} user_state = {combinedStore.getState().teamState}/>,
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
	const hash_url_data = window.location.hash.replace(/^#\/?|\/$/g,"").split("/");
	const location = hash_url_data[0];
	hash_url_data.shift();
	let params = [];
	for(let i =  0; i < hash_url_data.length; i++){
		(i%2 === 0) ? params[i].name = hash_url_data[i] : params[i].value = hash_url_data
	}
	set_application_state({location,params});
};
/*
const navigateTo = function(url,params){
	const desired_url = url;
	params.forEach(function(param){
		desired_url += 
	});
}
*/
window.addEventListener('hashchange', navigated, false);
navigated();