import React, { Component } from 'react';
import PlanJourney from './planJourney';
import advOne from '../asserts/images/adv1.jpg'
import advTwo from '../asserts/images/adv2.jpg'
import logo from '../asserts/images/CompanyLogo.jpg'

class Home extends Component{

    render(){
        return(
            <div id="mainContentApp">
                <div id="homeAdvDiv"><img src={advOne} alt="advOne"/><img src={logo} alt="logo" /><img src={advTwo} alt="advTwo"/></div>
                <PlanJourney />
            </div>
            )
    }
}
export default Home;