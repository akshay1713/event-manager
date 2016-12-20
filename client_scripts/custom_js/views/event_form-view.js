const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');
import {FocusableInput} from './custom_components';
import Select from 'react-select';
import Utils from '../utils';
import Ink from 'react-ink';

const EventForm = React.createClass({
    getInitialState:function(){
        return {
            unsaved_fields:[],
            deleted_fields:[]
        }
    },
    componentWillReceiveProps: function(next_props){
        this.setState({unsaved_fields:[], deleted_fields:[]});
    },
    componentDidMount: function(){
        const event_id = utils.getUrlParameter("event_id");
        utils.ajax({
            url:"/events/get_form_elements/"+event_id,
            method: 'POST',
            data:{},
            callback:(response) => {
                combinedStore.dispatch({
                    type:"UPDATE_FORM_FIELDS",
                    fields:response
                });
            }
        });
    },
    saveNewField: function(){
        const event_id = utils.getUrlParameter("event_id");
        let form_fields = this.state.unsaved_fields;
        form_fields.forEach((field) => {
            field.eventid = event_id;
        });
        utils.ajax({
            url: `/events/add_form_fields/${event_id}`,
            method: "POST",
            data:{form_fields},
            callback:(response) => {
                combinedStore.dispatch({
                    type:"ADD_FORM_ELEMENTS",
                    fields:form_fields
                });
            }
        });
    },
    addField: function(e){
        let state = this.state;
        const new_field = {element_type:"text", name:Utils.numInWords(state.unsaved_fields.length)};
        state.unsaved_fields.push(new_field);
        state.fields_count++;
        this.setState(state);
    },
    updateUnsavedField: function(field_data, index){
        let state = this.state;
        state.unsaved_fields[index] = field_data;
        this.setState(state);
    },
    clearUnsavedFields: function(){
        this.setState({unsaved_fields:[], deleted_fields:[]});
    },
    removeUnsaveField: function(index){
        let unsaved_fields = this.state.unsaved_fields;
        unsaved_fields.splice(index,1);
        let state = this.state;
        state.unsaved_fields = unsaved_fields;
        this.setState(state);

        // this.setState(Utils.updateReactState(this.state, {unsaved_fields}));
    },
    render:function(){
        let form_field_array = [];
        this.state.unsaved_fields.forEach((field, index) => {
            form_field_array.push(<FormField field = {field} index = {index} key = {index}
            updateUnsavedField = {this.updateUnsavedField} removeUnsaveField = {this.removeUnsaveField}/>);
        });
        let form_fields_existing = [];
        this.props.fields.forEach((field) => {
            form_fields_existing.push(<FormFieldExisting field={field}/>);
        });
        const new_field_btns_class = (this.state.unsaved_fields.length > 0) ? "" : "hidden";
        return(
            <div className = "form_elements_container">
            <div className="card">
				<div className="card-header" data-background-color="purple">
					<h4 className = "title">Form Fields</h4>
				</div>
				<div className="card-content table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>Field Name</th>
								<th>Type</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>{this.props.fields.map(this.renderSavedFormField)}</tbody>
					</table>
				</div>
			</div>
            <div className = "text-center">
                <button onClick = {this.addField} className="btn btn-primary">ADD A NEW FIELD<Ink/></button>
            </div>
                {form_field_array}
                <div className = "save_field_btns_container text-center">
                    <button onClick = {this.saveNewField} className={"btn btn-primary " + new_field_btns_class}>SAVE FORM FIELDS<Ink/></button>
                    <button onClick = {this.saveNewField} className={"btn btn-primary " + new_field_btns_class}>NOT NOW<Ink/></button>
                </div>
            </div>
            );
    },
    renderSavedFormField: function(field){
        const options_string = (field.options && field.options.length>0) ? field.options.join(", ") : "-";
        return(
            <tr key = {Math.random()}>
                <td>{field.name}</td>
                <td>{field.element_type}</td>
                <td>{options_string}</td>
            </tr>
        );
    }
});

const FormFieldExisting = React.createClass({
    render:function(){
        const field = this.props.field;
        // return null;
        let options_display = "", options_string = "";
        if(field.options){
            options_string = field.options.join(', ');
            options_display = <label>Field options: {options_string}</label>
        }
        return(
            {/*
            <div>
                <label>Field name: <span>{field.name}</span></label>
                <label>Field type: <span>{field.name}</span></label>
                {options_display}
            </div>
            */}
        );
    }
});

const FormField = React.createClass({
    render: function(){
        let form_field = "";
        form_field = this.renderUnsavedFormField(this.props.field);
        return(
            <div>
                {form_field}
            </div>
        );
    },
    updateUnsavedFieldType: function(option){
        let field = this.props.field;
        if(!field.options && option.value === "option"){
            field.options = ["",""];
        }
        field.element_type = option.value
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateUnsavedFieldName: function(e){
        let field = this.props.field;
        field.name = e.target.value
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateFieldOptions: function(option_value, i){
        let field = this.props.field;
        let new_options = field.options;
        new_options[i] = option_value;
        field.options = new_options;
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateOptionsCount: function(option){
        let field = this.props.field;
        let options_count = field.options.length
        let new_count = option.value;
        if(new_count > options_count){
            for(let i = options_count; i < new_count; i++){
                field.options.push("");
            }
        }
        else{
            field.options = field.options.slice(0, new_count);
        }
        this.props.updateUnsavedField(field, this.props.index);
    },
    clearCurrentField:function(){
        this.props.removeUnsaveField(this.props.index);
    },
    renderUnsavedFormField: function(field){
        const field_type_options = [{label:"Text", value:"text"}, {label:"Option", value:"option"}];
        return(
            <div className="new_field_container">
                <FocusableInput onBlur = {this.updateUnsavedFieldName} value = {field.name}
                placeholder="Field Name" className="field_name_container" is_controlled = {true}/>
                <Select name="field_type" value={field.element_type} options={field_type_options} 
                onChange={this.updateUnsavedFieldType}></Select>
                {this.renderOptions(field, 6)}
                <div className = "close_new_field" onClick={this.clearCurrentField}>&times;</div>
            </div>
        );
    },
    renderOptions: function(field, max_options){
        if(field.element_type === "text" || !field.options){
            return null;
        }
        let options_array = [];
        field.options.forEach((option, index) => {
            options_array.push(
                <FocusableInput onBlur = {(e) => {this.updateFieldOptions(e.target.value, index);}} 
                className = "field_option_name" placeholder={"Option "+ Utils.numInWords(index + 1)}/>
            );
        });
        let options_count=[];
        for(let i = 2; i <= max_options;++i){
            options_count.push({value:i, label:Utils.numInWords(i)});
        }
        return (
            <div className="field_options_container">
                <Select name = "field_options_count" options={options_count} value={options_array.count} 
                onChange={this.updateOptionsCount}></Select> 
                {options_array}
            </div>
            );
    }
});

module.exports = EventForm;