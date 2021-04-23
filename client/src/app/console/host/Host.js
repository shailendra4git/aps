import React from 'react';
import axios from "axios";
import { Button, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Host extends React.Component {

  constructor(props) {
    super(props);    
    
    this.state = {
      hosts: [],
      messageType: null,
      messageText: null
    };
  }

  componentDidMount(){
    this.getHost();
  }

  getHost(){
    var self = this;
    axios.get('/api/host/list')
    .then(function (response) {
      
      self.setState({
        hosts: response.data.body,
        messageType: null,
        messageText: null
      })     
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  hideMessage(){
    setTimeout(() => { 
      this.setState({
        messageType: null,
        messageText: null
      }) }, 5000)
  }

  columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'customer', text: 'Customer', sort: true },
    { dataField: 'region', text: 'Region', sort: true },
    { dataField: 'location', text: 'Location', sort: true },
    { dataField: 'connected', text: 'Connected', sort: true },
    { dataField: 'up', text: 'Up', sort: true }
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

  render() {
  return (
      <div className="page">
        <div className="row">
          <div className="col-md-12"><h2>Hosts</h2></div>
        </div>
        <div className="hosts">
          <BootstrapTable bootstrap4 keyField='name' data={this.state.hosts} columns={this.columns} defaultSorted={this.defaultSorted} pagination={this.pagination} />         
        </div>
      </div>
    );
  }
}
export default Host;