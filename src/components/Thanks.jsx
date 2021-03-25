import React, { Component } from 'react';
import logo from '../images/ptway@3x.png';
import sary from '../images/logo-green@3x.png';

class Thanks extends Component {

    render() {

        return (

            <div className='thanks_container fadeIn first'>
                
                <div className="logo">
                <img src={logo} alt="ptway" />
                <span></span>
                <img src={sary} alt="sary"/>
                </div>
                <p>!شكراً، تم إستلام بياناتك<br></br>
                .سيتم التواصل معك قريباً<br></br><br></br>

                لكي تصلك إعلانات وظيفية جديدة<br></br>
                !إنضم معنا</p>
                <a className="submit link fadeIn" href='https://www.ptway.net/user/signup'>Ptway سجّل في</a>
            </div>
        );
    }
}

export default Thanks;