const $ = require('jquery');
const ApplicationState = require('./application_state.js');
const config = require('./client_config.js');

const a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
const b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

const utils = {
	ajax: (ajax_params) => {
		const url = config.domain + ajax_params.url;
		const method = ajax_params.method ? ajax_params.method : "POST";
		if(!ajax_params.data){
			ajax_params.data = {};
		}
		$.ajax({
			url,
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
		Object.keys(new_state_params).forEach((key) => {
			updated_state[key] = new_state_params[key]
		});
		return updated_state;
	},

	numInWords: (num) => {
		if ((num = num.toString()).length > 9) return 'overflow';
		let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return; var str = '';
		str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
		str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]): '';
		return str;
	}
	
};

module.exports = utils;