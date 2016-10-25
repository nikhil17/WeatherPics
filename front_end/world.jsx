import React from 'react';
import ReactDOM from 'react-dom';
// import { Button, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import $ from 'jquery';
 


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
				 placeholder="Enter a city name..." 
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
	constructor(props) {
	  super(props);
	  
	  this.state = {};
	}

	render(){
		var cityInfo = [];
		console.log();
		cityInfo.push(<b> {this.props.city.location.city}, {this.props.city.location.country}</b>)

		if (this.props.showTemp){
			cityInfo.push(<p> Feels like: {this.props.city.current_observation.feelslike_c} Celsius</p>)
		}
		cityInfo.push(<p> wind : {this.props.city.current_observation.wind_gust_kph} km/hr  </p>)

		if (this.props.showHum){
			cityInfo.push(<p>Relative Humidity : {this.props.city.current_observation.relative_humidity} </p>)
		}

		console.log()

				// <p>
		  //       	{this.props.city.location.city}, {this.props.city.location.country} 
		  //       	  Feels like : {this.props.city.current_observation.feelslike_c} Celsius  
		  //       	wind : {this.props.city.current_observation.wind_gust_kph} km/hr  
		  //       	Relative Humidity : {this.props.city.current_observation.relative_humidity}
	   //      	</p>
		

		return(
			<div>
				
	        	{cityInfo}

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
		// console.log(this.props.filterText);
		let ft = this.props.filterText
		let hum = this.props.showHum
		let img = this.props.showImg
		let temp = this.props.showTemp
		this.props.cityWeather.forEach(function(city){
			if (city.location.city.indexOf(ft) == -1){
				return;
			}
			

			rows.push(<CityContainer key={city.location.city} city={city} 
			showHum={hum} showImg = {img} showTemp = {temp} />)
		});



		return (
			<div>
				{rows}

			</div>
		)
	}
}
CityTable.propTypes={
	filterText: React.PropTypes.string,
	cityWeather: React.PropTypes.array
}
CityTable.defaultProps ={
	filterText: "",
	cityWeather: []
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
		showImg: true,
		cityWeather:[]
	  };
	}
	loadServerContent(allURLs){
		var URLs = ["Australia/Sydney.json", "CA/San_Francisco.json","CA/Cupertino.json", 
		"India/Pune.json", "India/Mumbai.json", "GA/Atlanta.json"];
		

		
		
		
	    if (allURLs){
	    	//load all URLs
	    	for (var i = 0; i < URLs.length; i++){
	    		myURL = this.props.baseURL + URLs[i];
				$.ajax({
			      url: myURL,
			      dataType: 'json',
			      cache: false,
			      success: function(data) {
					
			        this.setState({cityWeather: this.state.cityWeather.concat([data])});
			        
			        console.log(data.location.city);
			        
			      }.bind(this),
			      error: function(xhr, status, err) {
			        console.error(this.props.url, status, err.toString());
			      }.bind(this)
			    });
	    	}
	    }
	    else{
	    	//Load only Sydney, AUS
		    var myURL = this.props.baseURL + "Australia/Sydney.json"
			$.ajax({
		      url: myURL,
		      dataType: 'json',
		      cache: false,
		      success: function(data) {

		        this.setState({cityWeather: this.state.cityWeather.concat([data])});
				
		        console.log(data.location.city);
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });
	    }
		
	}

	componentWillMount(){
		this.loadServerContent(true);
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
				<CityTable
					cityWeather = {this.state.cityWeather}
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


class LoadFromServer extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:'poo'
	  };
	}

	loadServerContent(allURLs){
		var URLs = ["Australia/Sydney.json", "CA/San_Francisco.json","CA/Cupertino.json", 
		"India/Pune.json", "India/Mumbai.json", "GA/Atlanta.json"];
		

		var myURL = this.props.baseURL + "Australia/Sydney.json"
		$.ajax({
	      url: myURL,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({[data.location.city]: data});
			
	        console.log(data.location.city);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });

	    if (allURLs){
	    	for (var i = 0; i < URLs.length; i++){
	    		myURL = this.props.baseURL + URLs[i];
				$.ajax({
			      url: myURL,
			      dataType: 'json',
			      cache: false,
			      success: function(data) {
					
			        this.setState({[data.location.city]: data});
			        
			        console.log(data.location.city);
			        
			      }.bind(this),
			      error: function(xhr, status, err) {
			        console.error(this.props.url, status, err.toString());
			      }.bind(this)
			    });
	    	}
	    }
		
	}

	componentWillMount(){
		this.loadServerContent(false);
	}

	render(){
		return null;
		// (
		// <div>
		// 	{data}
		// </div>)
		
	}
}

 
ReactDOM.render(<FilterableWeatherImageTable cities={CITIES}
	baseURL="http://api.wunderground.com/api/a2ee2bc849417a1d/geolookup/conditions/forecast/q/"/>, document.getElementById('world'));
// ReactDOM.render(<LoadFromServer baseURL="
// http://api.wunderground.com/api/a2ee2bc849417a1d/geolookup/conditions/forecast/q/
// "/>, document.getElementById('hello'));

