import React, { Component } from 'react';
import './customers.css';

const singleImages = '../';
class Customers extends Component {
    constructor(){
        super();
        this.state = {
            singles:[]
        }
        this.testing = this.testing.bind(this);
    }
    
    testing(){
        let input = document.getElementById('getinput').value;

        let d = new Date();
        let year = d.getFullYear();
        let input2 = document.getElementById('getage').value;

        let birthyear = year - input2;
        console.log(birthyear);

      
        let fetchData = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json;",
            },
            body: JSON.stringify({
                first_name:input,
                gender:"male",
                'dob <=':'2015-02-04'       
            }), 
            }
            fetch('/api/test',fetchData)
            .then(response => response.json())
            .then(singles => this.setState({singles: singles}, () => console.log('singles fetched..',singles)));
    }

    componentDidMount() {
       
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
        <h2>Customers</h2>
        <input type="text" id="getinput"/>
        <input type="number" id="getage"/>
        <button onClick={this.testing}>ClickMe</button>
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
