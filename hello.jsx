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

class Poo extends React.Component {

   constructor(props) {
      super(props);
        
      this.state = {
         data: 0
      }

      this.setNewNumber = this.setNewNumber.bind(this)
   };

   setNewNumber() {
      this.setState({data: this.state.data + 1})
   }

   render() {
      return (
         <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <PissContent myNumber = {this.state.data}></PissContent>
         </div>
      );
   }
}

class PissContent extends React.Component {
    constructor(props) {
      super(props);
        console.log('constructor')
        console.log(props);
      this.state = {};
    }

   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

   componentDidMount() {
      console.log('Component DID MOUNT!')
   }

   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps);

   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
      console.log(nextProps);
   }

   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
      console.log(prevProps)
   }

   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }

   render() {
      return (
         <div>
            <h3>{this.props.myNumber}</h3>
         </div>
      );
   }
}

ReactDOM.render(<Poo/>, document.getElementById('hello'));