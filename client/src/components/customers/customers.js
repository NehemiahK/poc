import React, { Component } from 'react';
import './customers.css';

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
            method: "POST", 
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json;",
            },
            body: JSON.stringify({
                first_name:input,
                gender:"male",
                'dob >=': maxAge,
                'dob <=': minAge      
            }) 
            };

        this.sendSingle(fetchData);
    }

    sendSingle(fetchData){
            fetch('/api/test',fetchData)
            .then(response => response.json())
            .then(singles => this.setState({singles: singles}, () => console.log('singles fetched..',singles)));
    }
    

  render() {
    function trimBioText(bio){
        return bio.substr(0,140) + '...';
    }
    function calculateAge(birthday) { 
        var birthdate = new Date(birthday);
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        return age;
    }
   
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
                    <div key={single.id} className="singlesCard">

                        <div className='singlesImageContainer'> 
                            <img src={process.env.PUBLIC_URL + single.picture } alt="single" className="singlesImage"/>
                        </div>
                   
                        <div className='singlesDataContainer'>
                            <p>{ single.first_name } { single.last_name }</p>
                            <p>{ calculateAge(single.dob) } {single.height +'cm'}</p>
                            <p>{ single.location }</p>
                            <p>{ single.dating_status }</p>
                            <p>{ single.occupation }</p>
                            <p>{ trimBioText(single.blurb) }</p>
                            <button>Read More</button>
                        </div>


                    </div>
                )
                }
        </div>
      </div>
    );
  }
}

export default Customers;
