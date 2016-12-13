import React from 'react';

const FocusableInput = React.createClass({
    getInitialState:function(){
        return {focused_class:""}
    },
    setFocusedState: function(){
        this.setState({focused_class:"is-focused"});
    },
    removeFocusedState: function(){
        this.setState({focused_class:""});
    },
    render:function(){
        return(
            <div className = {this.state.focused_class + " form-group label-floating is-empty"} 
            onClick = {this.setFocusedState} onBlur = {this.removeFocusedState}>
                <InputField input_class = {this.props.input_class} onChange = {this.props.onChange}  placeholder={this.props.placeholder}
                onBlur = {this.props.onBlur} label_text = {this.props.label_text} is_controlled = {this.props.is_controlled}/>
                <span className="material-input"></span>
            </div>
        );
    }
});

const InputField = React.createClass({
    render: function(){
        const onChangeFunc = (this.props.onChange) ? this.props.onChange : null;
        const onBlurFunc = (this.props.onBlur) ? this.props.onBlur : null;
        const label = (this.props.label_text) ? <label className="control-label">{this.props.label_text}</label> : null;
        if(!this.props.is_controlled){
            return (<div>{label}<input type = "text" className={this.props.input_class+ " form-control"} 
                placeholder={this.props.placeholder} onChange = {onChangeFunc} onBlur = {onBlurFunc}></input></div>);
        }
        else{
           return (<div>{label}<input type = "text" className={this.props.input_class+ " form-control"} 
           placeholder={this.props.placeholder} onChange = {onChangeFunc} onBlur = {onBlurFunc} value = {this.props.value}></input></div>); 
        }
    }
});

module.exports = FocusableInput;