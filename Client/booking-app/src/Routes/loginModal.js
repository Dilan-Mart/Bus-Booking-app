import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import loginimg from '../asserts/images/loginImg.jpg'

function LoginModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
      <div>
        <Button id="loginBtn" className="my-2" variant="btn btn-block rounded bg-info text-light" onClick={handleShow}>Login</Button>
        <Modal centered show={show} onHide={handleClose} style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
          <Modal.Header closeButton>
            <Modal.Title>Login Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={loginimg} alt="loginImg" className="ml-3 rounded-circle" />
            <form className="p-2" onSubmit={props.loginSubmitter}>
              <div className="mb-3">
                  <input type="email" className="form-control" id="loginUsername" onChange={props.validator} placeholder="Enter registered e-mail" required/>
              </div>
              <div className="mb-3">
                  <input type="password" className="form-control" id="loginPassword" onChange={props.validator} placeholder="Password" required/>
                  <div id="loginPasswordHelp" className="form-text text-danger"></div>
              </div>
              <button id="loginBtn" type="submit" className="btn btn-success btn-block" value="Submit" >Login</button>
            </form>
          </Modal.Body>
          <Modal.Footer>Don't have an account,<span className="text-primary btn" onClick={()=>{handleClose();document.getElementById('signUpBtn').click()}}>create one instantly</span></Modal.Footer>
        </Modal>
      </div>
    );
  }
  

export default LoginModal;