import React, { Component } from 'react';

export default class FooterTop extends Component {
  render(){
    return(
      <div className="footer-top light-text">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h5>CONTACT</h5>
              G47 Cars <br/>
              Delia Podar, Floresti<br/>
              Alexandra Uscat, Cluj-Napoca<br/>
             
            </div>
            <div className="col-4">
              <h5>HOURS</h5>
              Mon 8:00 am - 9:00 pm <br/>
              Tue 8:00 am - 9:00 pm <br/>
              Wed 8:00 am - 9:00 pm <br/>
              Thu 8:00 am - 9:00 pm <br/>
              Fri 8:00 am - 9:00 pm <br/>
              Sat 8:00 am - 8:00 pm <br/>

            </div>
            <div className="col-4">
              <h5>ABOUT</h5>
              <p>DeliAle Cars!!!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
