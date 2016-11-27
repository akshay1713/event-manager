const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
const ApplicationState = require('../application_state.js');

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
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html">Event Handler</a>
                    </div>
                    <ul className="nav navbar-right top-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-envelope"></i> <b className="caret"></b></a>
                            <ul className="dropdown-menu message-dropdown">
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-preview">
                                    <a href="#">
                                        <div className="media">
                                            <span className="pull-left">
                                                <img className="media-object" src="http://placehold.it/50x50" alt=""></img>
                                            </span>
                                            <div className="media-body">
                                                <h5 className="media-heading"><strong>John Smith</strong>
                                                </h5>
                                                <p className="small text-muted"><i className="fa fa-clock-o"></i> Yesterday at 4:32 PM</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur...</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="message-footer">
                                    <a href="#">Read All New Messages</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-bell"></i> <b className="caret"></b></a>
                            <ul className="dropdown-menu alert-dropdown">
                                <li>
                                    <a href="#">Alert Name <span className="label label-default">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-primary">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-success">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-info">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-warning">Alert Badge</span></a>
                                </li>
                                <li>
                                    <a href="#">Alert Name <span className="label label-danger">Alert Badge</span></a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">View All</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> {this.props.test} <b className="caret"></b></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li className = {this.isActive('team')} onClick = {this.setFilter.bind(this,'team')}>
                                <a href="#/team"><i className="fa fa-fw fa-dashboard"></i> Team</a>
                            </li>
                            <li className = {this.isActive('events')} onClick = {this.setFilter.bind(this,'events')}>
                                <a href="#/events"><i className="fa fa-fw fa-dashboard"></i> Events</a>
                            </li>
                        </ul>
                    </div>
        </nav>
        <div id = "page-wrapper">
        </div>
        </div>
        );
    }
});

module.exports = MainApp;