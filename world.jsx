import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
 


class SearchBar extends React.Component{

	handleChange(event){
		// console.log('piss')
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

class CityContainer extends React.Component{

	render(){
		console.log();
		return(
			<div>
			
	        	<p>
		        	{this.props.city.city_name}  {this.props.city.temperature} Celsius  
		        	wind :{this.props.city.wind}  
		        	  feels like : {this.props.city.feels_like}
	        	</p>
        	

        	</div>
		);
	}
}

class CityTable extends React.Component{

	constructor(props) {
    	super(props);
    	var rows = [];
		this.search = this.search.bind(this);
		// console.log(props);
		
	}

	search(){
		
		console.log("search " + this.props.filterText)
		// this.props.cities.forEach(function(city){
		// 	// if (city.city_name.indexOf(this.props.filterText) == -1){
		// 	// 	return;
		// 		// console.log(this.props.showHum);
			

		// 	rows.push(<CityContainer key={city.city_name} city={city} />)
		// }

	}

	render(){
		var rows = [];
		console.log(this.props.filterText)
		this.props.cities.forEach(function(city){
			// if (city.city_name.indexOf(this.props.filterText) == -1){
			// 	return;
			// }

			rows.push(<CityContainer key={city.city_name} city={city} />)
		});



		return (
			<div>
				<h4>cities here below</h4>
				{rows}

			</div>
		)
	}
}
CityTable.propTypes={
	filterText: React.PropTypes.string
}
CityTable.defaultProps ={
	filterText: ""
}



// CityRow.propTypes = {
// 	city: React.PropTypes.string,
// 	temperature:React.PropTypes.string,
// 	wind:React.PropTypes.string,
// 	feels_like:React.PropTypes.string,
// 	precipitation:React.PropTypes.string,

// }

var CITIES = [
	{city_name:'Bangalore', temperature:'21 C', wind: '10kmph', feels_like:'20', precipitation: '0.09'},
	{city_name:'Boston', temperature:'20 C', wind: '5kmph', feels_like:'20', precipitation:'0.01'},
	{city_name:'Mumbai', temperature:'19 C', wind: '10kmph', feels_like:'10', precipitation:'0.01'}
]

class FilterableWeatherImageTable extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		filterText: "",
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
				<CityTable
					filterText = {this.state.filterText}
					showTemp = {this.state.showTemp}
					showHum = {this.state.showHum}
					showImg = {this.state.showImg}
					cities = {this.props.cities}
				/>
			</div>
		)
	}
}





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


 
ReactDOM.render(<FilterableWeatherImageTable cities={CITIES}/>, document.getElementById('world'));
