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
        let fetchData = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                //"Accept": "application/json;",
            },
            body: JSON.stringify({
                name:input,
                gender:"male",
                religiously:"dati"
            }), 
            }
            fetch('/api/test',fetchData)
            .then(response => response.json())
            .then(singles => this.setState({singles: singles}, () => console.log('customers fetched..',singles)));
    }

    componentDidMount() {
       
    }

    

  render() {
    function trimBioText(bio){
        return bio.substr(0,140) + '...';
    }
   
    return (
      <div>
        <h2>Customers</h2>
        <input type="text" id="getinput"/>
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
                            <p>{ Math.floor(single.age / 365.2) } {single.height +'cm'}</p>
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
