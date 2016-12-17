import React from 'react';

const FocusableInput = React.createClass({
    componentDidMount:function(){
        console.log("componentDidMount of FocusableInput");
    },
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
            <div className = {this.state.focused_class + " form-group label-floating is-empty " +this.props.className} 
            onClick = {this.setFocusedState} onBlur = {this.removeFocusedState}>
                <InputField input_class = {this.props.input_class} onChange = {this.props.onChange}  placeholder={this.props.placeholder}
                onBlur = {this.props.onBlur} label_text = {this.props.label_text} is_controlled = {this.props.is_controlled} value = {this.props.value}/>
                <span className="material-input"></span>
            </div>
        );
    }
});

const InputField = React.createClass({
    getInitialState:function(){
        return({text_value:""});
    },
    componentDidMount:function(){
        if(this.props.is_controlled){
            this.setState({text_value:this.props.value});
        }
    },
    updateValueAndCallHandler: function(e){
        const value = e.target.value;
        // console.log("updating state of InputField");
        this.setState({text_value:value});
        if(typeof this.props.onChangeFunc === "function"){
            this.props.onChangeFunc(e);
        }
    },
    render: function(){
        // console.log(`InputField props ${JSON.stringify(this.props)}`);
        const onChangeFunc = (this.props.onChange) ? this.props.onChange : null;
        const onBlurFunc = (this.props.onBlur) ? this.props.onBlur : null;
        const label = (this.props.label_text) ? <label className="control-label">{this.props.label_text}</label> : null;
        if(!this.props.is_controlled){
            return (<div>{label}<input type = "text" className={this.props.input_class+ " form-control"} 
                placeholder={this.props.placeholder} onChange = {onChangeFunc} onBlur = {onBlurFunc}></input></div>);
        }
        else{
           return (
               <div>{label}<input type = "text" className={this.props.input_class+ " form-control"} onBlur = {onBlurFunc}
                onChange = {this.updateValueAndCallHandler} placeholder={this.props.placeholder} value = {this.state.text_value}>
                </input></div>
            ); 
        }
    }
});

module.exports = FocusableInput;