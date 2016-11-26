const utils = {

	ajax: (ajax_params) => {
		const url = "http://127.0.0.1:1337" + ajax_params.url;
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
	}
	
};