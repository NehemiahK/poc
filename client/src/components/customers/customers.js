import React, { Component } from 'react';
import './customers.css';
import axios from 'axios';

import SingleCard from '../single/Single.js';

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            singles:[]
        }
        this.prepareSingleData = this.prepareSingleData.bind(this);
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
        axios.get('/api/singles/', {params})
        .then((response) => {
            console.log(response);
            this.setState({singles: response.data})
          })
         .catch((error)=>{
            console.log(error);
         });
 
    }

  render() {
 
   
    return (
      <div>
        <div className="header">
          <h2>Singles</h2>
          <input type="text" id="getinput"/>
          <input type="number" id="getMinAge"/>
          <input type="number" id="getMaxAge"/>
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
