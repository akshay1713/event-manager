import React from 'react';
import  ReactDOM from 'react-dom';
import utils from './utils';
import {FocusableInput} from './views/custom_components';
import Ink from 'react-ink';
import Select from 'react-select';
import {UnsuccessfulRegistration, SuccessfulRegistration} from './views/post_registration-view';

const form_elements = window.__event_form_elements__;
const ticket_types = window.__ticket_types__;
const event_id = window.__event_id__;
const event_name = window.__event_name__;
console.log(event_name);

const form_target = document.getElementById("registration_form_container");

const postRegistrationFlow = (response) => {
    console.log(response.status);
    if(response.status){
        const attendee_details = response.attendee_status;
        ReactDOM.render(
            <SuccessfulRegistration order_id = {attendee_details._id} email = {attendee_details.email}
            quantity = {attendee_details.quantity} event_name = {event_name}/>,
            form_target
        );
    }
    else{
        ReactDOM.render(
            <UnsuccessfulRegistration/>,
            form_target
        );
    }
};

const RegistrationForm = React.createClass({
    componentDidMount: function(){},
    getInitialState:function(){
        let form_state = {
            firstname:"",
            lastname:"",
            email:""
        };
        form_elements.forEach((element) => {
            form_state[element.name] = ""
        });
        let ticket_type_options = [];
        ticket_types.forEach((type) => {
            ticket_type_options.push({value:parseInt(type.id), label:type.name});
        });
        const selected_ticket_type = null, selected_ticket_quantity = 1;
        return {
            form_state, selected_ticket_type, available_ticket_types:ticket_types, 
            ticket_type_options, selected_ticket_type, error_class:"hidden", selected_ticket_quantity
        };
    },
    updateFormField(field_name, field_value){
        let form_state = this.state.form_state
        form_state[field_name] = field_value;
        const new_state = utils.updateReactState(this.state, {form_state});
        this.setState(new_state);
    },
    updateTicketType: function(selected_ticket_type){
        const new_state = utils.updateReactState(this.state, {selected_ticket_type, selected_ticket_quantity:1});
        this.setState(new_state);
    },
    updateTicketQuantity: function(selected_ticket_quantity){
        const new_state = utils.updateReactState(this.state, {selected_ticket_quantity});
        this.setState(new_state);
    },
    registerForEvent: function(){
        const invalid = false;
        const form_fields = this.state.form_state;
        Object.keys(form_fields).some((field) => {
            if(!form_fields[field] || form_fields[field].length === 0){
                const invalid = true;
                const new_state = utils.updateReactState(this.state, {error_class:""})
                this.setState(new_state);
                setTimeout(this.clearWarning, 5000);
                return true;
            }
        });
        if(invalid){
            return true;
        }
        const ticketid = this.state.selected_ticket_type;
        const quantity = this.state.selected_ticket_quantity;
        utils.ajax({
            data:{form_fields, ticketid, quantity},
            method:"POST",
            url:`/events/submit_form/${event_id}`,
            callback:postRegistrationFlow
        })

    },
    clearWarning: function(){
        this.setState(utils.updateReactState(this.state, {error_class:"hidden"}));
    },
    render: function(){
        const additional_form_elements = [];
        this.props.form_elements.forEach((element) => {
            additional_form_elements.push(<AdditionalFormElement element = {element} 
            form_value = {this.state.form_state[element.name]} updateFormField = {this.updateFormField}
            updateSelectedOption = {this.updateSelectedOption}/>);
        });
        return(
            <div className = "registration_form">
                <TicketTypesSelector available_ticket_types = {this.state.available_ticket_types} updateTicketQuantity = {this.updateTicketQuantity}
                selected_ticket_type = {this.state.selected_ticket_type} selected_ticket_quantity = {this.state.selected_ticket_quantity}
                ticket_type_options = {this.state.ticket_type_options} updateTicketType = {this.updateTicketType}/>
                <CommonFormElements updateFormField = {this.updateFormField} firstname = {this.state.form_state.firstname} 
                lastname = {this.state.form_state.lastname} email = {this.state.form_state.email}/>
                {additional_form_elements}
                <div className="text-center">
                    <span className={this.state.error_class+" input_error"}>All fields are mandatory</span><br/>
                    <button className="btn btn-primary register-btn" 
                    onClick = {this.registerForEvent}>Register<Ink/></button>
                </div>
            </div>
        );
    }
});

const CommonFormElements = React.createClass({
    render: function(){
        return(
            <div>
                <div>
                    <div className="element_label">First Name: </div>
                    <FocusableInput is_controlled = {true} type="text" id="firstname" name="firstname" value = {this.props.firstname} 
                    onBlur = {(e) => {this.props.updateFormField("firstname", e.target.value);}} />
                </div>
                <div>
                    <div className="element_label">Last Name: </div>
                    <FocusableInput is_controlled = {true} type="text" id="lastname" name="lastname"  value = {this.props.lastname}
                    onBlur = {(e) => {this.props.updateFormField("lastname", e.target.value);}} />
                </div>
                <div>
                    <div className="element_label">Email: </div>
                    <FocusableInput is_controlled = {true} type="email" id="email" name="email" value = {this.props.email}
                    onBlur = {(e) => {this.props.updateFormField("email", e.target.value);}} />
                </div>
            </div>
        );
    }
});

const AdditionalFormElement = React.createClass({
    componentDidMount: function(){},
    render:function(){
        const element = this.props.element;
        if(element.element_type === "text"){
            return <div><div className="element_label">{element.name}: </div>
            <FocusableInput is_controlled = {true} type = "text"  value = {this.props.form_value}
            onBlur = {(e) => {this.props.updateFormField(element.name, e.target.value)}}/></div>
        }
        else{
            let options = [];
            element.options.forEach((option) => {
                options.push(<label className="form_element_option"><input name = {element.name} 
                type = "radio" value = {option}
                onChange = {(e) => {this.props.updateFormField(element.name, e.target.value)}}/>&nbsp;
                {option}</label>);
            });
            return <div><div className="element_label">{element.name}:</div>&nbsp;{options}</div>;
        }
    }
});

const TicketTypesSelector = React.createClass({
    render: function(){
        const selected_ticket_type = this.props.selected_ticket_type;
        const selected_ticket_type_obj = this.props.available_ticket_types.find(
            ticket_type => parseInt(ticket_type.id) === parseInt(selected_ticket_type)
        );
        let ticket_quantity_options = [];
        if(selected_ticket_type_obj){
            const max_per_person = Math.min(selected_ticket_type_obj.max_per_person, (selected_ticket_type_obj.maximum_available - selected_ticket_type_obj.booked));
            for(let i = 1; i<=max_per_person; ++i){
                ticket_quantity_options.push({value:i, label:utils.numInWords(i)});
            }
        }
        return(
            <div>
            <div className="element_label valign_top">Select Ticket Type: </div>
                <div className="ticket_type_container">
                    <Select
                        name = "ticket_type_select"
                        options = {this.props.ticket_type_options}
                        value = {this.props.selected_ticket_type}
                        onChange = {(option)=>{this.props.updateTicketType(option.value);}}
                        placeholder = "Select Ticket Type"
                    />
                </div>
                {this.renderTicketDetails(selected_ticket_type_obj, ticket_quantity_options, 
                this.props.selected_ticket_quantity, this.props.updateTicketQuantity)}
            </div>
        );
    },
    renderTicketDetails: function(ticket_type, ticket_quantity_options, selected_ticket_quantity, updateTicketQuantity){
        if(!ticket_type){
            return null;
        }
        const tickets_available = parseInt(ticket_type.maximum_available) - parseInt(ticket_type.booked);
        return(
            <div className="ticket_quantity_container">
                <div>
                &nbsp;<span>Select Quantity: </span></div>   
                <Select
                    name = "ticket_type_quantity"
                    options = {ticket_quantity_options}
                    value = {selected_ticket_quantity}
                    onChange = {(option)=>{updateTicketQuantity(option.value);}}
                    placeholder = "Select Ticket Quantity"
                />
            </div>
            );
    }
});

ReactDOM.render(
    <RegistrationForm form_elements = {form_elements}/>,
    form_target
);

