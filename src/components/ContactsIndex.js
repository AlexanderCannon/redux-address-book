import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchContacts } from '../actions';

class ContactIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterList: []
    }
  }
  componentDidMount() {
    this.props.fetchContacts();
  }

  filterList(e) {
    let filterList = this.props.contacts;
    filterList = _.pickBy(filterList, e.target.value);
    console.log(filterList, e.target.value);
    this.setState({ filterList });
  }

  renderContacts() {
    const list = this.state.filterList.length ? this.state.filterList : this.props.contacts;
    return _.map(list, contact => {
      return (<li className="list-group-item" key={contact._id}>
        <Link to={`/contacts/${contact._id}`}>{contact.name}</Link> {contact.phone_number}
      </li>);
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/contacts/new">
            New Contact.
          </Link>
          <input type='text' placeholder='Type to search' className="form-control" onChange={(e) => this.filterList(e)} />
        </div>
        <h3>Contacts</h3>
        <ul className="list-group">
          {this.renderContacts()}
        </ul>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return { contacts: state.contacts }
}

export default connect(mapStateToProps, { fetchContacts })(ContactIndex);
