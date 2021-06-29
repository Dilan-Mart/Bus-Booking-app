import React from 'react';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';
import './asserts/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Routes/Home';
import SignUp from './Routes/SignUp';
import Contact from './Routes/Contact';
import BasePage from './Routes/BasePage';
import ViewTickets from './Routes/ViewAndBookSeats';
import Payment from './Routes/payment';
import TicketConfirmation from './Routes/TicketConfirmation';

function App() {
  return (
  <Router>
    <BasePage/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={SignUp} />
        <Route path="/contact" component={Contact} />
        <Route path="/bookTickets" component={ViewTickets} />
        <Route path="/payment" component={Payment} />
        <Route path="/ticketConfirmation" component={TicketConfirmation} />
      </Switch>
  </Router>
  
  );
}

export default App;
