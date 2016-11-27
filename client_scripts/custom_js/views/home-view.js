const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');

const HomePage = React.createClass({
	componentWillMount: function(){
		//console.log("component will mount team");
	},
	componentDidMount: function(){
		//console.log("component did mount team");
	},
	render: function(){
		return (
			<h1>Hello </h1>
			);
	}
});

module.exports = HomePage;