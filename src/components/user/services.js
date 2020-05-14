import React, { Component } from 'react';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';

export default class Services extends Component{
  render(){
    return(
      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Card>
                <CardImg top width="100%" src="https://getpony.ro/wp-content/themes/understrap/img/A180-PONY-NEGRU.png" alt="New Car" />
                <CardBody>
                  <CardTitle>Find New Vehicle</CardTitle>
                  <Button className='btn-success'>More</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-3">
              <Card>
                <CardImg top width="100%" src="https://www.extremetech.com/wp-content/uploads/2019/10/Large-38751-2020HyundaiSonata-640x354.jpg" alt="Finance" />
                <CardBody>
                  <CardTitle>Rental it</CardTitle>
                  <Button className='btn-success'>More</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-3">
              <Card>
                <CardImg top width="100%" src="https://vrom.ro/wp-content/uploads/2015/09/bg-hero-repair-930px-x-250px.png" alt="Test Drive" />
                <CardBody>
                  <CardTitle>Schedule it</CardTitle>
                  <Button className='btn-success'>More</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-3">
              <Card>
                <CardImg top width="100%" src="https://apbservice.ro/wp-content/uploads/2017/03/logo3.png" alt="Service" />
                <CardBody>
                  <CardTitle>Schedule Service</CardTitle>
                  <Button className='btn-success'>More</Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
