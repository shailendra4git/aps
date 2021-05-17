import React from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";

import SelectSearch from 'react-select-search';

class CreateJob extends React.Component {

  constructor(props) {
    super(props);    
    
    this.state = {
      commands: [],
      command: null,
      disabledHost: true,
      hosts: [],
      host: null
    };
  }

  componentDidMount(){
    // this.getCommands();
    // this.getHost();
  }

  getCommands(){
    let self = this;
    axios.get('/api/host/region')
    .then(function (response) {
      let output = response.data.body.map( s => ({name: s.name, value:s.key}) );
      self.setState({
        commands: output
      })     
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  getHost(){
    let self = this;
    axios.get('/api/host/list')
    .then(function (response) {
      
      self.setState({
        hosts: response.data.body
      })     
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  setCommand = (val) => {
    this.setState({
      region: val,
      disabledHost: false
    })
    this.getHost(val);
  }

  setHost = (val) => {
    this.setState({
      host: val
    })
  }

  createJob = () => {
    console.log(this.state.command, this.state.host);
  }  

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12"><h2 className="title">Create Job</h2></div>
        </div>
        <div className="filter row">          
          <label className="search-label">Commands:</label>

          <SelectSearch
              options={this.state.commands}
              search
              placeholder="Select command"
              onChange={this.setCommand}
          />

          <label className="search-label">Hosts:</label>

          <SelectSearch
              options={this.state.hosts}
              search
              placeholder="Select host"
              onChange={this.setHost}
              disabled={this.state.disabledHost}
          />
          
          <button className="btn btn-primary btn-search" onClick={this.createJob}>Create</button>
        </div>
      </>
    );
  }
}
export default CreateJob;