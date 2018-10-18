import React, { Component } from 'react';
import './customers.css';

import SingleCard from '../single/Single.js';
import DynamicInput from '../inputs/DynamicInput';

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            singles:[],
            searchoptions:["age","name","gender"],
            selectedoptions:[],
            showAge:false,
            showName:false,
            comps:[],
            minAge:'',
            maxAge:'',
            firstName:"",
            gender:""
          
        }
        this.prepareSingleData = this.prepareSingleData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClick(event){
        if (this.state.selectedoptions.includes(event.target.value)){
            return;
        }
        this.setState(
            {
                comps:[...this.state.comps, event.target.value],
                selectedoptions:[...this.state.selectedoptions,event.target.value] 
            });
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleRemove(event){
        this.setState({
            comps: this.state.comps.filter((comp) => comp !== event.target.name),
            selectedoptions: this.state.selectedoptions.filter((option) => option !== event.target.name)
            
        })
        
    }

  
    prepareSingleData(){
        let first_name = this.state.firstName;
        let gender = this.state.gender;
        let minAge = this.state.minAge;
        let maxAge = this.state.maxAge;

        let fetchData = {
                first_name,
                 gender,
                 maxAge,
                 minAge      
            }
          
        this.setState({
            firstName:'',
            gender:'',
            minAge:'',
            maxAge:''
        });

        this.sendSingle(fetchData);
    }
        
    handleComp(el){
        if(el === "age"){
            return (<div key={el} className="ageinputs rule">
                <button className="ex" onClick={this.handleRemove} name={el}> x </button>
                Age:
                <input type="number" name="minAge" value={this.state.minAge} placeholder="Min Age" onChange={this.handleChange}/>
                <span>to:</span>
                <input type="number" name="maxAge" value={this.state.maxAge} placeholder="Max Age" onChange={this.handleChange}/>    
              </div>);
        }

        if (el==="name"){
        return (<div key ={el} className="nameinputs rule">
            <button className="ex" onClick={this.handleRemove} name={el}> x </button>
            Name:
        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="first name"/>
        </div>
    );
        }

        if(el==="gender"){
            return (<div key ={el} className="genderinputs rule">
                <button className="ex" onClick={this.handleRemove} name={el}> x </button>
                Gender:
            <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} placeholder="gender"/>
            </div>
        );
        }
        
    };
 
    sendSingle(params){
        //URL needed an http://url which is why I had to chop up the URL
        const url = new URL("http://localhost/api/singles");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        let fetchUrl = url.pathname + url.search;
        fetch(fetchUrl)
        .then(response => response.json())
        .then(singles => this.setState({singles: singles}, () => console.log('singles fetched..',singles)));
    }

  render() {

    
   
    return (
      <div>
        <div className="header">
          <h2>Singles</h2>
          <div className="ruleOptions">
        
         { this.state.searchoptions.map((option) => <button key={option} value={option} onClick={this.handleClick} 
         style={{backgroundColor: this.state.selectedoptions.includes(option) ? "grey" : "blue" }}
         > {option} </button>) }
             
             <button className="searchbutton" onClick={this.prepareSingleData}>Search</button>
          </div>
                
         { this.state.comps.map((el) => this.handleComp(el))  }
          
          
        </div>
        <div className='singlesResults'>
        {
            this.state.singles.map(
                (single) => 
                <SingleCard key = {single.id} single={single}/>
            )
        }
           
        </div>
      </div>
    );
  }
}

export default Customers;
