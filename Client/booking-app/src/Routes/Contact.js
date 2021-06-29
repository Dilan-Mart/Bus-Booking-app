import React from 'react';
import Card from 'react-bootstrap/Card';
import male from '../asserts/images/male.jpg'
import female from '../asserts/images/female.jpg'
const Contact=()=>{
    return(
        <div className="mx-auto my-5 d-md-flex" >
            <Card style={{ width: '18rem',margin:'2rem' }}>
                <Card.Img variant="top" src={male} />
                <Card.Body className="text-center">
                    <Card.Title>CEO</Card.Title>
                    <Card.Text>
                    email : ceo@igotit.com
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem',margin:'2rem' }}>
                <Card.Img variant="top" src={female} />
                <Card.Body className="text-center">
                    <Card.Title>CTO</Card.Title>
                    <Card.Text>
                    email : cto@igotit.com
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem',margin:'2rem' }}>
                <Card.Img variant="top" src={male} />
                <Card.Body className="text-center">
                    <Card.Title>CFO</Card.Title>
                    <Card.Text>
                    email : cfo@igotit.com
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Contact;