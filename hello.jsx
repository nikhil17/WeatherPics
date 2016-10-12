import React from 'react';
import ReactDOM from 'react-dom'; 

class Hello extends React.Component {
  render() {
    return <h1>Poopers</h1>
  }
}

var Parent = React.createClass({

    getInitialState: function() {
        return {
            value: 'foo'
        }
    },

    changeHandler: function(value) {
        this.setState({
            value: value
        });
    },

    render: function() {
        return (
            <div>
                <Child value={this.state.value} onChange={this.changeHandler} />
                <span>{this.state.value}</span>
            </div>
        );
    }
});

var Child = React.createClass({
    propTypes: {
        value:      React.PropTypes.string,
        onChange:   React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    changeChandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
    render: function() {
        return (
            <input type="text" value={this.props.value} onChange={this.changeChandler} />
        );
    }
});

ReactDOM.render(<Parent/>, document.getElementById('hello'));