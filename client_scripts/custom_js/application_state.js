let ApplicationState = {
	location: window.location.hash.replace(/^#\/?|\/$/g,'').split('/')[0],
	params:{}
};

module.exports = ApplicationState;