const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
const ApplicationState = require('../application_state.js');
import Ink from 'react-ink';

const MainApp = React.createClass({
    componentWillMount: function(){
        //console.log("component will mount mainapp");
    },    
    componentDidMount: function(){
        //console.log("component did mount mainapp");
    },
    getDefaultProps: function() {
        return ({ test: 'value1' });
    },
    getInitialState: function(){
        let selected = "";
        switch (ApplicationState.location){
            case "#/team": selected = "team";
                        break;
            case "#/events": selected = "events";
                        break;
        }
        return{
            'selected':selected
        };
    },
    setFilter: function(filter){
        this.setState({"selected" : filter});
        switch(filter){
            case "team":
                utils.navigateTo("team");		
                break;
            case "events":
                utils.navigateTo("events");
                break;
            default:
                break;
        }
    },
    isActive:function(tab_value){
        return (tab_value === this.state.selected) ? "active" : "";
    },
    render: function(){
        return(
        <div>
        <div className="side_navbar">
            <ul>
                <li className = {this.isActive('team')} onClick = {this.setFilter.bind(this,'team')}>
                    <a href="javascript:;">Team</a>
                    <Ink/>
                </li>
                <li className = {this.isActive('events')} onClick = {this.setFilter.bind(this,'events')}>
                    <a href="javascript:;">Events</a>
                    <Ink/>
                </li>
            </ul>
        </div>
        <div id = "em_page_wrapper">
        </div>
        </div>
        );
    }
});

module.exports = MainApp;