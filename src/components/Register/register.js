import React, { Component } from 'react';
import './register.css';
import firebase from '../../fire';
class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      EmailError: '',
      PasswordError: ''

    }
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  clearErrors = () => {
    this.setState({ EmailError: "", PasswordError: "" });
  }
  setUserProfileData = (user) => {
    const db = firebase.firestore();

    db
      .collection("users")
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        cart: [],

      });
  };

  onSubmitRegister = async () => {


    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.props.onRouteChange("home")
      await result.user.updateProfile({ displayName: this.state.name });
      return await this.setUserProfileData(result.user);
    } catch (err) {
      switch (err.code) {
            case "auth/eamil-already-in-use":
            case "auth/invalid-email":
              this.setState({ EmailError: err.message });  
              break;
            case "auth/weak-password":
             this.setState({ PasswordError: err.message });     
              break;
           default:
            alert("register error")
          }
    }

  }
  render() {
    return (
      <div className='mainForm' >

        <div className='registerFormDiv'>



          <div className='innerDiv'>
            <label> Name</label>
            <input onChange={this.onNameChange} className='registerInput' />

          </div>
          <div className='innerDiv'>
            <label> Email</label>
            <input required type="text" onChange={this.onEmailChange} className='registerInput' />
            <p style={{ color: "red" }}>{this.state.EmailError}</p>

          </div>
          <div className='innerDiv'>
            <label> Password</label>
            <input required type="password" onChange={this.onPasswordChange} className='registerInput' />
            <p style={{ color: "red" }}>{this.state.PasswordError}</p>

          </div>
          <button onClick={this.onSubmitRegister} className='registerBtn'> Register</button>
        </div>

      </div>
    );

  }
}

export default Register;


