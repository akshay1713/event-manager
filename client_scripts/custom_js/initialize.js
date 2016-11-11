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