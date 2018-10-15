import React, { Component } from 'react';
import './singlecard.css';

class SingleCard extends Component {
    
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
      const single = this.props.single;
    return (
      <div className="singlesCard">
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
    );
  }
}

export default SingleCard;
