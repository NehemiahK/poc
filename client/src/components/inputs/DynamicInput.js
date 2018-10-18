import React, { Component } from 'react';
import './dynamicinput.css';

class DynamicInput extends Component {
    //constructor()
    
  render() {
 
    return (
      <div className="dynamicInput">
        <input name={this.props.name} 
        placeholder={this.props.placeholder} 
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.change}
        />
      </div>
    );
  }
}

export default DynamicInput;
