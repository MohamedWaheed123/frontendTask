import React, { Component } from "react";
import "./signin.css";
import firebase from '../../fire';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      EmailError: "",
      PasswordError: ""
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  clearErrors = () => {
    this.setState({ EmailError: "", PasswordError: "" });
  }
  onSubmitSignin = async () => {
   try{
    this.clearErrors();
    await firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPassword)
    const user= firebase.auth().currentUser;
    if(user.email==="admin@gmail.com")
    {
      this.props.onRouteChange("admin")

    }
    else{
      this.props.onRouteChange("home")

    }
    
   }

    catch(err)  {

      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          this.setState({ EmailError: err.message });
          break;
        case "auth/wrong-password":
          this.setState({ PasswordError: err.message });
          break;
          default:
            alert("signin error")
          
      }
  
    }

     };
  render() {
    return (
     
      <div className="mainForm">
        <div className="registerFormDiv">

          <div className="innerDiv">
            <label> Email</label>
            <input required type="text" onChange={this.onEmailChange} className="registerInput" />
            <p style={{ color: "red" }}>{this.state.EmailError}</p>
          </div>
          <div className="innerDiv">
            <label> Password</label>
            <input required type="password" onChange={this.onPasswordChange} className="registerInput" />
            <p className="errorMsg">{this.state.PasswordError}</p>
          </div>
          <button onClick={this.onSubmitSignin} className="registerBtn">
            {" "}
            SignIn
          </button>
        </div>
      </div>
    );
  }
}

export default SignIn;
