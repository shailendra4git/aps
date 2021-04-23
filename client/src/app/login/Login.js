import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import Messages from "../shared/messages/Messages";
import logo from '../../assets/images/atos-logo-white.png';

class Login extends React.Component {

  constructor(props) {
    super(props);    
    
    this.state = {
      fields: {},
      errors: {},
      messageType: null,
      messageText: null
    };
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //username
    if(!fields["username"]){
      formIsValid = false;
      errors["username"] = "Username is required";
    }

    //password
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Password is required";
    } 

    this.setState({errors: errors});
    return formIsValid;
  }

  handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.handleValidation()){
      let data = {
        "username": this.state.fields.username,
        "password": this.state.fields.password
      };
  
      var self = this;  
      axios({
        method: 'post',
        url: '/api/login',
        headers: {
          "Accept": "application/json",
          'content-type': 'application/json'
        },
        data: data
      })
      .then(response => {
        if(response.data.statuscode === 200){
          Cookies.set("isLoggedIn", "true");
          Cookies.set("username", this.state.fields.username);

          window.location.href = "/";
        } else {
          self.setState({
            messageType: 'error',
            messageText: 'Authentication failed, please try again!'
          });
        }
      })
      .catch(error => {
        console.error(error)
      });       
    }
  }

  handleReset = () => {
    this.setState({
      fields: {},
      errors: {}
    });
  }

  render() {
    return (
      <div className="login">
        <div className="row">
          <div className="col-md-4 logobox">
            <div className="logo">
              <img src={logo} title="APS Edge" alt="APS Edge" width="100" />
            </div>
          </div>
          <div className="col-md-8 login-form">
            <h3>Login</h3>
              <Messages messageType={this.state.messageType} messageText={this.state.messageText}></Messages>          
              <form onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" placeholder="Username" value={this.state.fields["username"] || ''} onChange={this.handleChange.bind(this, "username")} required />
                    {this.state.errors["username"] && (
                      <p className="text-danger">{this.state.errors["username"]}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Password:</label>                    
                    <input type="password" className="form-control" placeholder="Password" value={this.state.fields["password"] || ''} onChange={this.handleChange.bind(this, "password")} required />
                    {this.state.errors["password"] && (
                      <p className="text-danger">{this.state.errors["password"]}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-sm btn-primary" title="Login">Login</button>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={this.handleReset} title="Reset">Reset</button>
                  </div>           
              </form>
          </div>
        </div>
      </div>
    )    
  }
}
export default Login;