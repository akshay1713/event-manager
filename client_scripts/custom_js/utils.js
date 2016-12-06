const $ = require('jquery');
const ApplicationState = require('./application_state.js');
const config = require('./client_config.js');

const utils = {
	ajax: (ajax_params) => {
		const url = config.domain + ajax_params.url;
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
	},

	navigateTo: (url) => {
		window.location.hash = url;
	},

	getUrlParameter: (param_name) => {
		return ApplicationState.params[param_name];
	},

	updateReactState: (state, new_state_params) => {
		let updated_state = state;
		new_state_params.forEach((param) => {
			updated_state[param.name] = param.value;
		});
		return updated_state;
	}
	
};

module.exports = utils;