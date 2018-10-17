import React, { Component } from 'react';
import './customers.css';

import SingleCard from '../single/Single.js';

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            singles:[],
            showAge:false,
            showName:false
        }
        this.prepareSingleData = this.prepareSingleData.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    handleCheckBoxChange(event){        
       this.setState({[event.target.value]: event.target.checked})
    }
    
    getMinAndMaxAge(){
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let input2 = document.getElementById('getMinAge').value;
        let input3 = document.getElementById('getMaxAge').value;
        let minBirthyear = year - input2;
        let maxBirthyear = year - input3;
        let minAge = minBirthyear + '-' + (month + 1) + '-' + day;
        let maxAge = (maxBirthyear - 1) +   '-' + (month  - 1) + '-' + (day + 1);

        return [minAge,maxAge];
    }

    prepareSingleData(){
        let input = document.getElementById('getinput').value; //name for now 
        let [minAge, maxAge] = this.getMinAndMaxAge();

        let fetchData = {
                first_name:input,
                gender:"male",
                 maxAge,
                 minAge      
            }
          

        this.sendSingle(fetchData);
    }

    sendSingle(params){
        //URL needed an http://url which is why I had to chop up the URL
        const url = new URL("http://localhost/api/singles");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        let fetchUrl = url.pathname + url.search;
        fetch(fetchUrl)
        .then(response => response.json())
        .then(singles => this.setState({singles: singles}, () => console.log('customers fetched..',singles)));
    }

  render() {
 
   
    return (
      <div>
        <div className="header">
          <h2>Singles</h2>
          <div>
              Age <input type="checkbox" name="age" value="showAge" onChange = {this.handleCheckBoxChange}/>
          </div>
          
          <div>
              Name <input type="checkbox" name="name" value="showName" onChange = {this.handleCheckBoxChange}/>
          </div>
         

          { this.state.showName && <input type="text" id="getinput"/> }
          { this.state.showAge && 
          <div>
            <input type="number" id="getMinAge" placeholder="Min Age"/>
            <input type="number" id="getMaxAge" placeholder="Max Age"/>    
          </div> }

        
          <button onClick={this.prepareSingleData}>ClickMe</button>
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
