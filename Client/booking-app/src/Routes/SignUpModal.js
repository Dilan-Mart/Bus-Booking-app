import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePick from './DatePicker'

function SignUpModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
      <div id="signUpDiv" className="signUpDiv">
        <Button id="signUpBtn" variant="btn btn-block rounded bg-info text-light" onClick={handleShow}>Sign up</Button>
        <Modal centered show={show} onHide={handleClose} style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
          <Modal.Header closeButton>
            <Modal.Title>Create an account with us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div>
                    <form className="p-2" onSubmit={props.signUpSubmitter}>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="fullNameInput" onChange={props.validator} placeholder="Please type your Full name" required/>
                            <div id="fullNameHelp" className="form-text text-danger"></div>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="emailInput" onChange={props.validator} placeholder="Please type a valid e-mail" required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="passwordInput" onChange={props.validator} placeholder="Setup your password" required/>
                            <div id="passwordHelp" className="form-text text-danger"></div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="mobile" onChange={props.validator} placeholder="Mobile no" required/>
                            <div id="mobileHelp" className="form-text text-danger"></div>
                        </div>
                        <div id="radioGroup" className="mb-3">
                            <input type="radio" className="mr-1" id="Male" name="gender" value="male" onClick={props.validator} required/><label htmlFor="Male">Male</label>
                            <input type="radio" className="mx-1" id="Female" name="gender" value="female" onClick={props.validator} required/><label htmlFor="Female">Female</label>
                        </div>
                        <div id="dobDiv" className="mb-3">
                            <DatePick maxDate={new Date()} id="dob" placeholder="Date of Birth" className="p-2 rounded text-capitalize" required="required"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="TCapply" required/>
                            <label className="form-check-label" htmlFor="TCapply">I Agree to the <a href='/#'>terms &amp; conditions</a> </label>
                        </div>
                        <button id="submitBtn" type="submit" className="btn btn-info btn-block" value="Submit" >Sign Up</button>
                    </form>
                </div>
          </Modal.Body>
          <Modal.Footer>Already have an account,<span className="text-primary btn" onClick={()=>{handleClose();document.getElementById('loginBtn').click()}}>please login</span></Modal.Footer>
        </Modal>
      </div>
    );
  }
  

export default SignUpModal;