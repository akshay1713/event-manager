const $ = require('jquery');
const ApplicationState = require('./application_state.js');
const config = require('./client_config.js');

const utils = {
	ajax: (ajax_params) => {
		console.log(config.domain);
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

	navigateTo: (url,params) => {
		let desired_url = url;
		params.forEach(function(param){
			desired_url += "/" + param.name + "/" + param.value; 
		});
		window.location.hash = desired_url;
	},

	getUrlParameter: (param_name) => {
		return ApplicationState.params[param_name];
	}
	
};

module.exports = utils;