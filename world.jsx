import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
 
class World extends React.Component {
  render() {
    return (
    	<div>
    		
    		{/* <Button bsStyle="success">Aryan is the don mafatlal</Button> */}
    		<FilterableWeatherImageTable/>
    	</div>
    	)

    
  }
}




class FilterableWeatherImageTable extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		filterText: '',
		showTemp: true,
		showHum: true,
		showImg: true
	  };
	}

	handleUserInput(filterText, showTemp, showHum, showImg) {
    	this.setState({
      		filterText: filterText,
			showImg: showImg,
			showHum: showHum,
			showTemp: showTemp
    	});
  	}	

	render(){
		return(
			<div>

				<SearchBar 
					filterText = {this.state.filterText}
					showTemp = {this.state.showTemp}
					showHum = {this.state.showHum}
					showImg = {this.state.showImg}
					onUserInput= {this.handleUserInput.bind(this)}

				/>
				<h3>Content  is here below</h3>
			</div>
		)
	}
}




class SearchBar extends React.Component{

	handleChange(event){
		console.log('piss')
		this.props.onUserInput(this.refs.searchText.value,
			this.refs.temp.checked,
			this.refs.hum.checked,
			this.refs.img.checked)
	}

	textBoxChange(){
		// this.setState(){
		// }
	}
	

	render(){
		return (
			<form>
				 <input type="text" 
				 placeholder="Search..." 
				 value= {this.props.filterText}
				 ref= "searchText"
				 onChange= {this.handleChange.bind(this)}/>
        			<p>
          				<input 
	          				type="checkbox" 
	          				checked= {this.props.showTemp}
	          				onChange= {this.handleChange.bind(this)}
	          				ref="temp"
          				/>
          				{' '}
          				Show Temperature
          				{' '}
          				<input type="checkbox" 
	          				checked= {this.props.showHum}
	          				ref="hum"
	          				onChange= {this.handleChange.bind(this)}
          				/>
          				{' '}
          				Show Humidity
          				{' '}
          				<input type="checkbox" 
	          				checked= {this.props.showImg}
	          				onChange= {this.handleChange.bind(this)}
	          				ref="img"
          				/>
          				{' '}
          				Display Images
          				{' '}
        			</p>
			</form>
		)
	}
}
SearchBar.propTypes = {
	filterText: React.PropTypes.string,
	showTemp: React.PropTypes.bool,
	showHum: React.PropTypes.bool,
	showImg: React.PropTypes.bool
}

class CityRow extends React.Component{
	render(){
		return(
			<tr>

			</tr>
		);
	}
}

CityRow.propTypes = {
	city: React.PropTypes.string,
	temperature:React.PropTypes.string,
	wind:React.PropTypes.string,
	feels_like:React.PropTypes.string,
	precipitation:React.PropTypes.string,

}

var Cities = [
	{city:'Bangalore', temperature:'21 C', wind: '10kmph', feels_like:'20', precipitation: '0.09'},
	{city:'Boston', temperature:'20 C', wind: '5kmph', feels_like:'20', precipitation:'0.01'},
	{city:'Mumbai', temperature:'19 C', wind: '10kmph', feels_like:'10', precipitation:'0.01'}
]


var MyComponent = React.createClass({
  handleClick: function() {
    // Explicitly focus the text input using the raw DOM API.
    if (this.piss !== null) {
      this.piss.focus();
      console.log(this)
    }
  },
  render: function() {
    // The ref attribute is a callback that saves a reference to the
    // component to this.myTextInput when the component is mounted.
    return (
      <div>
        <input type="text" ref={(ref) => this.piss = ref} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
    );
  }
});



class MyNavbar extends React.Component{
	render(){
		return (
			<div className= 'MyNavbar'>
			<Navbar>
				   	<Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">Oorja Udyog</a>
				      </Navbar.Brand>
				    </Navbar.Header>
			    <Nav>
			      <NavItem eventKey={1} href="#">Link</NavItem>
			      <NavItem eventKey={2} href="#">Link</NavItem>
			      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
			        <MenuItem eventKey={3.1}>Action</MenuItem>
			        <MenuItem eventKey={3.2}>Another action</MenuItem>
			        <MenuItem eventKey={3.3}>Something else here</MenuItem>
			        <MenuItem divider />
			        <MenuItem eventKey={3.3}>Separated link</MenuItem>
			      </NavDropdown>
			    </Nav>
		  	</Navbar>
		  	</div>
	)}
}

 
ReactDOM.render(<FilterableWeatherImageTable/>, document.getElementById('world'));
