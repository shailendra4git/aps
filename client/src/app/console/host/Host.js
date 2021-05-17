import React from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import SelectSearch from 'react-select-search';

class Host extends React.Component {

  constructor(props) {
    super(props);    
    
    this.state = {
      regions: [],
      region: null,
      locations: [],
      location: null,
      disabledLocation: true,
      hosts: []
    };
  }

  componentDidMount(){
    this.getRegion();
    this.getHost();
  }

  getRegion(){
    let self = this;
    axios.get('/api/host/region')
    .then(function (response) {
      let output = response.data.body.map( s => ({name: s.name, value:s.key}) );
      self.setState({
        regions: output
      })     
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  getLocation(regionKey){
    let self = this;
    axios.get('/api/host/' + regionKey + '/location')
    .then(function (response) {
      let output = response.data.body.map( s => ({name: s.name, value:s.key}) );
      self.setState({
        locations: output
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
  
  connectedFormatter(cell, row) {
    if (cell === true) {
      return (
        <Button variant="success" size="sm">
            Yes
        </Button>
      );
    } else {
      return (
        <Button variant="danger" size="sm">
            No
        </Button>
      );
    }
  }

  columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'customer', text: 'Customer', sort: true },
    { dataField: 'region', text: 'Region', sort: true },
    { dataField: 'location', text: 'Location', sort: true },
    { dataField: 'connected', text: 'Connected', formatter: this.connectedFormatter, sort: true },
    { dataField: 'last_seen', text: 'Last Seen' }
  ];

  defaultSorted = [{
    dataField: 'name',
    order: 'asc'
  }];

  pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  setRegion = (val) => {
    this.setState({
      region: val,
      locations: [0],
      disabledLocation: false
    })
    this.getLocation(val);
  }

  setLocation = (val) => {
    this.setState({
      location: val
    })
  }

  search = () => {
    console.log(this.state.region, this.state.location);
  }  

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-12"><h2 className="title">Hosts</h2></div>
        </div>
        <div className="filter row">          
          <label className="search-label">Region:</label>

          <SelectSearch
              options={this.state.regions}
              search
              placeholder="Select region"
              onChange={this.setRegion}
          />

          <label className="search-label">Location:</label>

          <SelectSearch
              options={this.state.locations}
              search
              placeholder="Select location"
              onChange={this.setLocation}
              disabled={this.state.disabledLocation}
          />

          <label className="search-label">Customer:</label>

          <SelectSearch
              options={this.state.locations}
              search
              placeholder="Select customer"
              onChange={this.setLocation}
              disabled={this.state.disabledLocation}
          />
          
          <button className="btn btn-primary btn-search" onClick={this.search}>Search</button>
        </div>
        <div className="hosts">
          <BootstrapTable bootstrap4 keyField='name' data={this.state.hosts} columns={this.columns} defaultSorted={this.defaultSorted} pagination={this.pagination} />         
        </div>
      </>
    );
  }
}
export default Host;