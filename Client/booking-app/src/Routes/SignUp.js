import React, { Component } from 'react';
import axios from 'axios';
import SignUpModal from './SignUpModal';
import LoginModal from './loginModal';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';


class SignUp extends Component{
    constructor(){
        super()
        this.state={
            fullName:'',
            email:'',
            password:'',
            mobile:'',
            gender:'',
            loginUsername:'',
            loginPassword:'',
            active:false
        }
        this.validator=this.validator.bind(this);
        this.signUpSubmitter=this.signUpSubmitter.bind(this);
        this.loginSubmitter=this.loginSubmitter.bind(this);
    }

    validator(event){
        let id=event.target.id,val=event.target.value;
        const onlyAlpha=/^[a-zA-Z ]+$/,alphaNumeric=/^[a-zA-Z0-9]+$/;
        switch (id) {
            case 'fullNameInput':
                if(onlyAlpha.test(val) && val.length>= 5 && val.length<= 30 && val.trim().length!==0){
                    document.getElementById('fullNameHelp').innerHTML='';this.setState({fullName:val})
                }else{
                    document.getElementById('fullNameHelp').innerHTML='Characters must be within 5-30. Special characters not allowed';
                    this.setState({fullName:''})
                }
                break;

            case 'emailInput':
                this.setState({email:val})
                break;
            case 'passwordInput':
                if(alphaNumeric.test(val) && val.length >= 8 && val.length <= 20){
                    document.getElementById('passwordHelp').innerHTML='';this.setState({password:val})
                }else{
                    document.getElementById('passwordHelp').innerHTML='Password length: 8-20';this.setState({password:''})
                }
                break;
            case 'mobile':
                if(!!Number(val) && val.trim().length===10){
                    document.getElementById('mobileHelp').innerHTML='';this.setState({mobile:val})
                }else{
                    document.getElementById('mobileHelp').innerHTML='mobile number should be 10 digits';this.setState({mobile:''})
                }
                break;
            case 'Male':
                this.setState({gender:val});
                break;
            case 'Female':
                this.setState({gender:val});
                break;
            case 'loginUsername':
                    this.setState({loginUsername:val})
                    break;
            case 'loginPassword':
                if(alphaNumeric.test(val) && val.length >= 8 && val.length <= 20){
                    document.getElementById('loginPasswordHelp').innerHTML='';this.setState({loginPassword:val})
                }else{
                    document.getElementById('loginPasswordHelp').innerHTML='Password length: 8-20';this.setState({loginPassword:''})
                }
                break;
            default:
                break;
        }

    }
    signUpSubmitter(event){
        event.preventDefault()
        const registry={
            fullName:this.state.fullName,
            email:this.state.email,
            password:this.state.password,
            mobile:this.state.mobile,
            gender:this.state.gender,
            dob:document.getElementById('dob').value
        }
        if(registry.fullName.length===0 || registry.email.length===0 || registry.password.length===0 || registry.mobile.length===0 || registry.gender.length===0 || registry.dob.length===0){
            alert("Please complete the form properly");
        }else {
            axios.post('http://localhost:4000/app/signUpData',registry)
            .then(response=>alert(response.data))
            .catch(e=>console.log(e))
        
        this.setState({fullName:'',email:'',password:'',mobile:'',gender:'',dob:''});
        }
    }
    loginSubmitter(event){
        event.preventDefault()
        const registry={
            loginUsername:this.state.loginUsername,
            loginPassword:this.state.loginPassword
        }
        if(registry.loginUsername.length===0 || registry.loginPassword.length===0){
            alert("Please fill login fields");
        }else {
            /* First post the login data and the server processes and then sends back true/false */
            axios.post('http://localhost:4000/app/loginData',registry).then(response=>{
                alert(response.data.message);
                if(response.data.message==="\nLogin Sucessful"){
                    this.setState({active:true,fullName:response.data.fullName},function(){
                        if(this.state.active && this.props.booking==="started"){
                            this.props.history.push('/payment')
                            document.getElementById('paymentIndicator').style.backgroundColor="green";
                            this.props.logIn(response.data.fullName,this.state.loginUsername);
                        }else if(this.state.active){
                            this.props.history.push('/')
                            this.props.logIn(response.data.fullName,this.state.loginUsername);
                        }});
                }else{
                    this.setState({active:false});
                }
            }).catch(e=>console.log(e));
        }
    }
    logout=()=>{
        if(window.confirm("Are you sure you want to logout")){
            window.location="/";
        }
    }
    render(){
        return(
            <div id="accountServices" className="accountServices">
                <SignUpModal signUpSubmitter={this.signUpSubmitter} validator={this.validator}/>
                <LoginModal loginSubmitter={this.loginSubmitter} validator={this.validator}/>
                <button id="logoutBtn" className="btn btn-block rounded bg-danger text-light" onClick={this.logout} >Logout</button>
            </div>
        )
    }
    componentDidMount(){
        if(this.props.isLoggedIn){
            document.getElementById('logoutBtn').style.display="block";
            document.getElementById('signUpBtn').style.display="none";
            document.getElementById('loginBtn').style.display="none";
        }else{
            document.getElementById('logoutBtn').style.display="none";
            document.getElementById('signUpBtn').style.display="block";
            document.getElementById('loginBtn').style.display="block";
        }
    }

}

const mapStateToProps=state=>{
    return{
        isLoggedIn:state.isLoggedIn,
        name:state.name,
        booking:state.booking
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        logIn:(theName,userName)=>dispatch({type:actionTypes.LOGGED_IN,payload:{isLoggedIn:true,name:theName,userName:userName}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
