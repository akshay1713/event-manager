import React from 'react';

export const FocusableInput = React.createClass({
    componentDidMount:function(){
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
        this.setState({text_value:value});
        if(typeof this.props.onChangeFunc === "function"){
            this.props.onChangeFunc(e);
        }
    },
    render: function(){
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

export const FocusableTextArea = React.createClass({
    componentDidMount:function(){
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
                <InputTextArea input_class = {this.props.input_class} onChange = {this.props.onChange}  placeholder={this.props.placeholder}
                onBlur = {this.props.onBlur} label_text = {this.props.label_text} is_controlled = {this.props.is_controlled} value = {this.props.value}/>
                <span className="material-input"></span>
            </div>
        );
    }
});

const InputTextArea = React.createClass({
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
        this.setState({text_value:value});
        if(typeof this.props.onChangeFunc === "function"){
            this.props.onChangeFunc(e);
        }
    },
    render: function(){
        const onChangeFunc = (this.props.onChange) ? this.props.onChange : null;
        const onBlurFunc = (this.props.onBlur) ? this.props.onBlur : null;
        const label = (this.props.label_text) ? <label className="control-label">{this.props.label_text}</label> : null;
        const rows = (this.props.rows) ? this.props.rows : 4;
        const cols = (this.props.cols) ? this.props.cols : 10;
        if(!this.props.is_controlled){
            return (
                <div>
                {label}
                <textarea type = "text" className={this.props.input_class+ " form-control"} cols = {cols}
                rows = {rows} placeholder={this.props.placeholder} onChange = {onChangeFunc} onBlur = {onBlurFunc}></textarea>
                </div>);
        }
        else{
           return (
                <div>
                {label}
                <textarea type = "text" className={this.props.input_class+ " form-control"} onBlur = {onBlurFunc} cols = {cols} 
                rows = {rows} onChange = {this.updateValueAndCallHandler} placeholder={this.props.placeholder} 
                value = {this.state.text_value}>
                </textarea>
                </div>
            ); 
        }
    }
});
