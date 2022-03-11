import React from 'react';
import logo from './img/image1.png';
import alt from './img/image4.svg';
import './css/First.css';

class First extends React.Component {
    constructor(props) {
        super(props)
}

    render() {
        return (
            <div class="center">
                <img class="main" src={logo} alt="logo"></img>
                <img class="topleft" src={alt} alt="logo"></img>
            
            </div>
        )
    }
}

export default First;