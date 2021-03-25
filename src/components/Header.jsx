import React, { Component } from 'react';
import logo from '../images/ptway@3x.png';
class Header extends Component {

    render() {
        return (

            <div className="header">
                <img src={logo} alt="PTway" className="fadeIn"/>
            </div>
        );
    }
}

export default Header;