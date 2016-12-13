const React = require('react');
const utils = require('../utils.js');
const combinedStore = require('../redux_state_manager.js');

const EventForm = React.createClass({
    getInitialState:function(){
        return {
            unsaved_fields:[],
            deleted_fields:[]
        }
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
                this.setState({
                    unsaved_fields:[],
                    deleted_fields:[]
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
        const new_field = {element_type:"text"}
        state.unsaved_fields.push(new_field);
        state.fields_count++;
        this.setState(state);
    },
    updateUnsavedField: function(field_data, index){
        let state = this.state;
        state.unsaved_fields[index] = field_data;
        this.setState(state);
    },
    render:function(){
        let form_field_array = [];
        this.state.unsaved_fields.forEach((field, index) => {
            form_field_array.push(<FormField field = {field} index = {index} updateUnsavedField = {this.updateUnsavedField}/>);
        });
        let form_fields_existing = [];
        this.props.fields.forEach((field) => {
            form_fields_existing.push(<FormFieldExisting field={field}/>);
        });
        return(
            <div>
            <div className="card">
				<div className="card-header" data-background-color="purple">
					<h4 className = "title">Form Fields</h4>
				</div>
				<div className="card-content table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th>Field Name</th>
								<th>Maximum Available</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>{this.props.fields.map(this.renderSavedFormField)}</tbody>
					</table>
				</div>
			</div>
             <button onClick = {this.addField}>Add a new field</button>
                {form_field_array}
            <button onClick = {this.saveNewField}>Save Form fields</button>
            </div>
            );
    },
    renderSavedFormField: function(field){
        console.log(field.options);
        const options_string = (field.options && field.options.length>0) ? field.options.join(", ") : "-";
        return(
            <tr>
                <td>{field.name}</td>
                <td>{field.type}</td>
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
    // renderSavedFormField: function(field){
    //     let options_string = "";
    //     field.options.forEach((option) => {
    //         options_string += `${option}, `;
    //     });
    //     return(
    //         <div>
    //         Name of field: {field.name} Type: {field.element_type} {options_string}
    //         </div>
    //     );
    // },
    updateUnsavedFieldType: function(e){
        let field = this.props.field;
        if(!field.options && e.target.value === "option"){
            field.options = ["",""];
        }
        field.element_type = e.target.value
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateUnsavedFieldName: function(e){
        let field = this.props.field;
        field.name = e.target.value
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateFieldOptions: function(e, i){
        let field = this.props.field;
        field.options[i] = e.target.value;
        this.props.updateUnsavedField(field, this.props.index);
    },
    updateOptionsCount: function(e){
        let field = this.props.field;
        let options_count = field.options.length
        let new_count = e.target.value;
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
    renderUnsavedFormField: function(field){
        return(
            <div>
                Enter field name: <input type = "text" onBlur = {this.updateUnsavedFieldName}/>
                <select onChange = {this.updateUnsavedFieldType}>
                    <option value = "text" selected = {field.element_type !== "option"}>Text</option>
                    <option value = "option" selected = {field.element_type === "option"}>Option</option>
                </select>
                {this.renderOptions(field)}
            </div>
        );
    },
    renderOptions: function(field){
        if(field.element_type === "text" || !field.options){
            return null;
        }
        let options_array = [];
        field.options.forEach((option, index) => {
            options_array.push(<input type = "text" onBlur = {(e) => {this.updateFieldOptions(e, index);}}/>);
        });
        let options_count_dropdown = [];
        for(let i = 2; i < 6; i++){
            options_count_dropdown.push(<option value = {i}>{i}</option>);
        }
        return (
            <div>
                {options_array}
                <select defaultValue = {options_array.length} onChange = {this.updateOptionsCount}>
                    {options_count_dropdown}
                </select>
            </div>
            );
    }
});

module.exports = EventForm;